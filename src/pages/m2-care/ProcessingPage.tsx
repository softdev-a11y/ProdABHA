import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
import {
  Menu,
  CheckCircle2,
  Loader2,
  Circle,
  XCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useM2 } from "../../hooks/useM2";

type StepStatus = "pending" | "processing" | "success" | "failed";

type StepItem = {
  id: string;
  title: string;
  status: StepStatus;
  detail?: string;
};

type WorkflowErrorState = {
  stepTitle: string;
  title: string;
  code?: string;
  description: string;
  details?: string;
};

const POLL_INTERVAL_MS = 3000;
const LINK_RETRY_INTERVAL_MS = 3000;
const MAX_LINK_RETRIES = 3;
const HIP_ID = (import.meta.env.VITE_M2_HIP_ID || "").trim();
const HIP_NAME = (import.meta.env.VITE_M2_HIP_NAME || "").trim();

const initialSteps: StepItem[] = [
  { id: "linkTokenGenerated", title: "Link Token Generated", status: "pending" },
  { id: "transactionCreated", title: "Transaction Created", status: "pending" },
  { id: "waitingForLinkToken", title: "Waiting for Link Token", status: "pending" },
  { id: "linkTokenReceived", title: "Link Token Received", status: "pending" },
  { id: "linkingCareContext", title: "Linking Care Context", status: "pending" },
  { id: "careContextLinked", title: "Care Context Linked", status: "pending" },
  { id: "sendingSms", title: "Sending SMS Notification", status: "pending" },
  { id: "smsSent", title: "SMS Notification Sent", status: "pending" },
  { id: "completed", title: "Completed", status: "pending" },
];

const ProcessingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const m2 = useM2();
  const generateLinkTokenRef = useRef(m2.generateLinkToken);
  const getWorkflowStatusRef = useRef(m2.getWorkflowStatus);
  const linkCareContextRef = useRef(m2.linkCareContext);
  const sendSMSRef = useRef(m2.sendSMS);
  const notifyCareContextRef = useRef(m2.notifyCareContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [steps, setSteps] = useState<StepItem[]>(initialSteps);
  const [workflowError, setWorkflowError] = useState<WorkflowErrorState | null>(null);
  const [retryInfo, setRetryInfo] = useState("");
  const [isRunning, setIsRunning] = useState(true);
  const [transactionId, setTransactionId] = useState("");

  const isMountedRef = useRef(true);
  const isCancelledRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const totalSuccessCount = useMemo(
    () => steps.filter((step) => step.status === "success").length,
    [steps]
  );

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const wait = async (ms: number) =>
    new Promise<void>((resolve) => {
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        resolve();
      }, ms);
    });

  const updateStep = (
    stepId: string,
    status: StepStatus,
    detail?: string
  ) => {
    if (!isMountedRef.current) return;

    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? {
              ...step,
              status,
              detail,
            }
          : step
      )
    );
  };

  const parseJsonIfPossible = (value: any) => {
    if (typeof value !== "string") return value;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const readableDetails = (value: any) => {
    if (!value) return undefined;

    if (typeof value === "string") {
      return value.trim() || undefined;
    }

    if (typeof value === "object") {
      return Object.entries(value)
        .map(([key, entry]) => `${key}: ${String(entry)}`)
        .join("\n");
    }

    return String(value);
  };

  const toWorkflowError = (
    response: any,
    stepTitle: string,
    fallbackTitle: string,
    fallbackDescription: string
  ): WorkflowErrorState => {
    const parsedData = parseJsonIfPossible(response?.data);
    const errorObject = parsedData?.error;
    const errorCode = errorObject?.code;
    const errorMessage = errorObject?.message || response?.message;

    if (errorCode === "ABDM-1092") {
      return {
        stepTitle,
        title: "Duplicate Link Token Request",
        code: errorCode,
        description:
          "A Link Token has already been generated for this patient. Please wait or cancel the current transaction before trying again. (Duplicate Link Token Request)",
      };
    }

    if (/care context linking failed/i.test(errorMessage || "")) {
      return {
        stepTitle,
        title: "Unable to Link Care Context",
        description:
          "The Care Context could not be linked. Please retry. If the problem continues, contact your administrator.",
        details: readableDetails(parsedData),
      };
    }

    return {
      stepTitle,
      title: errorMessage || fallbackTitle,
      code: errorCode,
      description: response?.message || fallbackDescription,
      details: readableDetails(parsedData),
    };
  };

  const stopWorkflowWithError = (
    stepId: string,
    error: WorkflowErrorState
  ) => {
    updateStep(stepId, "failed", "Failed");
    setWorkflowError(error);
    setIsRunning(false);
    clearTimer();
  };

  const pollWorkflow = async (
    txnId: string,
    stepId: string,
    stepTitle: string,
    isDone: (data: any) => boolean
  ) => {
    while (!isCancelledRef.current) {
      const response = await getWorkflowStatusRef.current(txnId);

      if (isCancelledRef.current) return null;

      if (!response) {
        stopWorkflowWithError(stepId, {
          stepTitle,
          title: "Unable to Fetch Workflow Status",
          description: "Workflow status could not be fetched. Please try again.",
        });
        return null;
      }

      if (response?.success === false) {
        stopWorkflowWithError(
          stepId,
          toWorkflowError(
            response,
            stepTitle,
            "Workflow Failed",
            "The workflow failed while checking status."
          )
        );
        return null;
      }

      const data = response?.data || {};
      const message = data?.message;

      if (message) {
        updateStep(stepId, "processing", message);
      }

      if (data?.currentStep === 99) {
        stopWorkflowWithError(stepId, {
          stepTitle,
          title: "Workflow Failed",
          description:
            message || "The workflow failed unexpectedly while processing the request.",
          details: readableDetails(data),
        });
        return null;
      }

      if (isDone(data)) {
        return data;
      }

      await wait(POLL_INTERVAL_MS);
    }

    return null;
  };

  const handleCancelTransaction = () => {
    isCancelledRef.current = true;
    clearTimer();
    setIsRunning(false);
    toast.success("Transaction cancelled.");
    navigate("/linkedpatients", { replace: true });
  };

  const handleNavigateAway = (path: string) => {
    isCancelledRef.current = true;
    clearTimer();
    setIsRunning(false);
    navigate(path, { replace: true });
  };

  useEffect(() => {
    isMountedRef.current = true;

    const runWorkflow = async () => {
      const workflowInit = (location.state as any)?.workflowInit;

      if (!workflowInit) {
        setWorkflowError({
          stepTitle: "Initialization",
          title: "Workflow Data Missing",
          description:
            "Unable to start processing because the selected patient data was not found.",
        });
        setIsRunning(false);
        return;
      }

      if (!workflowInit?.tokenPayload || !workflowInit?.patientPayload || !workflowInit?.patientData) {
        setWorkflowError({
          stepTitle: "Initialization",
          title: "Invalid Workflow Data",
          description: "Required workflow payload is missing. Please start again from Search Patient.",
        });
        setIsRunning(false);
        return;
      }

      if (!HIP_ID || !HIP_NAME) {
        setWorkflowError({
          stepTitle: "Initialization",
          title: "HIP Configuration Missing",
          description:
            "HIP ID/Name is not configured. Please set VITE_M2_HIP_ID and VITE_M2_HIP_NAME in the environment file.",
        });
        setIsRunning(false);
        return;
      }

      updateStep("linkTokenGenerated", "processing", "Generating link token...");

      const tokenResponse = await generateLinkTokenRef.current(workflowInit.tokenPayload);

      if (isCancelledRef.current) return;

      if (!tokenResponse || tokenResponse?.success === false) {
        stopWorkflowWithError(
          "linkTokenGenerated",
          toWorkflowError(
            tokenResponse,
            "Link Token Generated",
            "ABDM Error",
            "Unable to generate link token."
          )
        );
        return;
      }

      const txnId = tokenResponse?.data?.transactionId;

      if (!txnId) {
        stopWorkflowWithError("transactionCreated", {
          stepTitle: "Transaction Created",
          title: "Transaction ID Missing",
          description: "Link token was generated but no transaction ID was returned.",
        });
        return;
      }

      setTransactionId(txnId);

      updateStep("linkTokenGenerated", "success", "Link token request accepted");
      updateStep("transactionCreated", "success", `Transaction ID: ${txnId}`);
      updateStep("waitingForLinkToken", "processing", "Waiting for callback...");

      const tokenStatus = await pollWorkflow(
        txnId,
        "waitingForLinkToken",
        "Waiting for Link Token",
        (data) =>
          Boolean(data?.linkTokenReceived) ||
          Boolean(data?.linkToken) ||
          Number(data?.currentStep) >= 3
      );

      if (!tokenStatus || isCancelledRef.current) return;

      const linkToken = tokenStatus?.linkToken;

      if (!linkToken) {
        stopWorkflowWithError("linkTokenReceived", {
          stepTitle: "Link Token Received",
          title: "Link Token Missing",
          description: "Callback received but link token was not present.",
          details: readableDetails(tokenStatus),
        });
        return;
      }

      updateStep("waitingForLinkToken", "success", "Link token callback received");
      updateStep("linkTokenReceived", "success", "Link token received successfully");

      const linkPayload = {
        abhaNumber: workflowInit.patientData?.abhaNumber,
        abhaAddress: workflowInit.patientData?.abhaAddress,
        linkToken,
        patient: workflowInit.patientPayload,
        transactionId: txnId,
      };

      updateStep("linkingCareContext", "processing", "Calling link care context API...");

      let linkSucceeded = false;
      let linkFailureResponse: any = null;

      for (let attempt = 1; attempt <= MAX_LINK_RETRIES; attempt++) {
        if (isCancelledRef.current) return;

        setRetryInfo(attempt === 1 ? "" : `Retry ${attempt - 1} of ${MAX_LINK_RETRIES}`);

        const linkResponse = await linkCareContextRef.current(linkPayload);

        if (isCancelledRef.current) return;

        if (linkResponse?.success) {
          linkSucceeded = true;
          break;
        }

        linkFailureResponse = linkResponse;

        if (attempt < MAX_LINK_RETRIES) {
          updateStep(
            "linkingCareContext",
            "processing",
            `Retry ${attempt} of ${MAX_LINK_RETRIES} in ${LINK_RETRY_INTERVAL_MS / 1000}s`
          );
          await wait(LINK_RETRY_INTERVAL_MS);
        }
      }

      if (!linkSucceeded) {
        stopWorkflowWithError(
          "linkingCareContext",
          toWorkflowError(
            linkFailureResponse,
            "Linking Care Context",
            "Unable to Link Care Context",
            "The Care Context could not be linked."
          )
        );
        return;
      }

      setRetryInfo("");
      updateStep("linkingCareContext", "success", "Link API call completed");
      updateStep("careContextLinked", "processing", "Verifying linkage status...");

      const linkedStatus = await pollWorkflow(
        txnId,
        "careContextLinked",
        "Care Context Linked",
        (data) =>
          Number(data?.currentStep) >= 4 ||
          data?.careContextLinked === true ||
          String(data?.status || "").toLowerCase().includes("carecontextlinked")
      );

      if (!linkedStatus || isCancelledRef.current) return;

      updateStep("careContextLinked", "success", "Care context linked");
      updateStep("sendingSms", "processing", "Triggering SMS and notification...");

      const patientMobile = String(workflowInit?.patientMobile || "").trim();

      const smsPayload = {
        requestId: "string",
        timestamp: "string",
        abhaAddress: linkPayload.abhaAddress,
        notification: {
          phoneNo: patientMobile,
          hip: {
            id: HIP_ID,
            name: HIP_NAME,
          },
        },
        transactionId: linkPayload.transactionId,
      };

      const smsResponse = await sendSMSRef.current(smsPayload);

      if (isCancelledRef.current) return;

      if (!smsResponse || smsResponse?.success === false) {
        stopWorkflowWithError(
          "sendingSms",
          toWorkflowError(
            smsResponse,
            "Sending SMS Notification",
            "Unable to Send SMS Notification",
            "SMS notification could not be sent."
          )
        );
        return;
      }

      const notifyPayload = {
        notification: {
          patient: {
            id: linkPayload.abhaAddress,
          },
          careContext: {
            patientReference: linkPayload.patient?.[0]?.referenceNumber,
            careContextReference: linkPayload.patient?.[0]?.careContexts
              ?.map((item: any) => item.referenceNumber)
              .join(","),
          },
          hiTypes: [linkPayload.patient?.[0]?.hiType],
          date: new Date().toISOString(),
          hip: {
            id: HIP_ID,
          },
        },
      };

      const notifyResponse = await notifyCareContextRef.current(notifyPayload);

      if (isCancelledRef.current) return;

      if (!notifyResponse || notifyResponse?.success === false) {
        stopWorkflowWithError(
          "sendingSms",
          toWorkflowError(
            notifyResponse,
            "Sending SMS Notification",
            "Unable to Complete Notification",
            "Notification update failed after care context linking."
          )
        );
        return;
      }

      updateStep("sendingSms", "success", "SMS API triggered");
      updateStep("smsSent", "processing", "Waiting for SMS status...");

      const smsStatus = await pollWorkflow(
        txnId,
        "smsSent",
        "SMS Notification Sent",
        (data) => {
          const smsFlag = String(data?.smsStatus || data?.notificationStatus || "").toUpperCase();
          const msg = String(data?.message || "").toLowerCase();

          return (
            smsFlag === "SENT" ||
            Number(data?.currentStep) >= 5 ||
            (msg.includes("sms") && msg.includes("sent"))
          );
        }
      );

      if (!smsStatus || isCancelledRef.current) return;

      updateStep("smsSent", "success", "SMS notification sent");
      updateStep("completed", "success", "Completed successfully");

      const successPayload = {
        patientName: workflowInit.patientData?.patName,
        abhaNumber: workflowInit.patientData?.abhaNumber,
        linkedCareContextCount: workflowInit.selectedCareContextCount || 0,
        linkedAt: new Date().toISOString(),
      };

      await wait(600);

      if (!isCancelledRef.current) {
        setIsRunning(false);
        navigate("/success", {
          state: successPayload,
        });
      }
    };

    runWorkflow();

    return () => {
      isMountedRef.current = false;
      isCancelledRef.current = true;
      clearTimer();
    };
  }, [navigate]);

  const statusText = (status: StepStatus) => {
    if (status === "processing") return "Processing";
    if (status === "success") return "Success";
    if (status === "failed") return "Failed";
    return "Pending";
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onNavigate={handleNavigateAway}
      />

      <div className="flex-1 flex flex-col pt-16 lg:pt-0">
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold text-slate-800">Processing</h1>
          <div className="w-9 h-9" />
        </div>

        <div className="p-4 lg:p-8">
          <div className="hidden lg:block mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Care Context Linking</h1>
            <p className="text-sm text-slate-500 mt-1">
              Track each step of the linking workflow in real time.
            </p>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Processing Transaction</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {transactionId ? `Transaction ID: ${transactionId}` : "Transaction ID will appear after token generation."}
                </p>
              </div>

              {(isRunning || workflowError) && (
                <button
                  onClick={handleCancelTransaction}
                  className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
                >
                  Cancel Transaction
                </button>
              )}
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Completed steps: {totalSuccessCount} / {steps.length}
            </div>

            {retryInfo && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
                {retryInfo}
              </div>
            )}

            {workflowError && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                <p className="font-semibold">{workflowError.title}</p>
                <p className="mt-1">{workflowError.description}</p>
                <p className="mt-2 text-xs text-rose-700">Step: {workflowError.stepTitle}</p>
                {workflowError.code && (
                  <p className="mt-1 text-xs text-rose-700">Code: {workflowError.code}</p>
                )}
                {workflowError.details && (
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg border border-rose-200 bg-white p-3 text-xs text-slate-700">
                    {workflowError.details}
                  </pre>
                )}
              </div>
            )}

            <div className="mt-8">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="relative pl-10 pb-6 last:pb-0">
                    {!isLast && (
                      <span className="absolute left-[17px] top-7 h-full w-px bg-slate-200" />
                    )}

                    <div className="absolute left-0 top-0">
                      {step.status === "success" && (
                        <CheckCircle2 className="text-emerald-600" size={20} />
                      )}
                      {step.status === "processing" && (
                        <Loader2 className="animate-spin text-teal-600" size={20} />
                      )}
                      {step.status === "failed" && (
                        <XCircle className="text-rose-600" size={20} />
                      )}
                      {step.status === "pending" && (
                        <Circle className="text-slate-300" size={20} />
                      )}
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                        <span
                          className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                            step.status === "success"
                              ? "bg-emerald-100 text-emerald-700"
                              : step.status === "processing"
                              ? "bg-teal-100 text-teal-700"
                              : step.status === "failed"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {statusText(step.status)}
                        </span>
                      </div>

                      {step.detail && (
                        <p className="mt-2 text-xs text-slate-500">{step.detail}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {isRunning && (
              <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-center text-sm font-medium text-blue-700">
                  Please do not close this window while linking is in progress.
                </p>
              </div>
            )}

            {!isRunning && !workflowError && (
              <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-center text-sm font-medium text-emerald-700">
                  Completed successfully. Redirecting to success screen...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
