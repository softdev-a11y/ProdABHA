import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useM3 from "../../hooks/useM3";
import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import toast from "react-hot-toast";

const ConsentDetailsPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

const { getConsentDetails, requestHealthInformation } = useM3();

const requestId = location.state?.requestId;

const [consent, setConsent] = useState<any>(null);

const [loading, setLoading] = useState(true);


const handleRequestData = async () => {
  try {
    const payload = {
      consent: {
        id: consent.consentId,
      },
   dateRange: {
  from: consent.permissionFromUtc + "Z",
  to: consent.permissionToUtc + "Z",
},
    };

    console.log("CONSENT OBJECT", consent);
    console.log("REQUEST PAYLOAD", payload);

    const response =
      await requestHealthInformation(payload);

    if (response?.success) {
      toast.success(response.message);
    } else {
      toast.error(response?.message || "Request failed");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to request health information.");
  }
};

useEffect(() => {

    const loadConsent = async () => {

        if (!requestId) return;

        const response =
        await getConsentDetails(requestId);

       setConsent(response.data);

        setLoading(false);

    };

    loadConsent();

}, [requestId, ]);

const isGranted = consent?.status === "GRANTED";

if (loading) {
    return (
      <ConsentLayout>
        <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Loading consent details...</p>
        </div>
      </ConsentLayout>
    );
}

console.log(consent);

  return (
    <ConsentLayout>
      <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:p-6 shadow-sm">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl">
            Consent Details
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View complete consent request details.
          </p>
        </div>

        {/* Patient Details */}
       <div className="mt-8">

          <h2 className="mb-4 text-lg font-semibold text-slate-800 sm:text-xl">
            Patient Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Patient Name 
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800 break-words">
               {consent.patName}
              </p>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                MR No
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {consent.mrno}
              </p>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                ABHA ID
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800 break-all">
                {consent.patientAbhaNumber}
              </p>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                ABHA Address
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800 break-all">
                {consent.patientAbhaAddress}
              </p>
            </div>

          </div>

        </div>

        {/* Consent Details */}
       <div className="mt-8">

          <h2 className="mb-4 text-lg font-semibold text-slate-800 sm:text-xl">
            Consent Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Purpose
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800 break-words">
              {consent.purposeText}
              </p>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                HI Types
              </p>

          <div className="mt-2 flex flex-wrap gap-2">
  {consent.hiTypesJson ? (
    JSON.parse(consent.hiTypesJson).map((type: string) => (
      <span
        key={type}
        className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-700"
      >
        {type}
      </span>
    ))
  ) : (
    <span className="text-sm text-slate-500">
      No HI Types Selected
    </span>
  )}
</div>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                From Date
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
             {new Date(consent.permissionFromUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                To Date
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
              {new Date(consent.permissionToUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Status
              </p>

              <span className="mt-2 inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
            {consent.status}
              </span>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Consent Created
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
             {new Date(consent.createdAtUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="min-h-[90px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Data Erase At
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {new Date(consent.dataEraseAtUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

          </div>

        </div>

        {/* Buttons  */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

          <button
            onClick={() => navigate("/m3/request-list")}
           className="w-full rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
          >
            Back
          </button>

          <button
          className="w-full sm:w-auto rounded-lg bg-blue-600 px-5 py-2.5 text-sm text-white hover:bg-blue-700"
            onClick={handleRequestData}
          >
            Request Data
          </button>

      <button
  disabled={!isGranted}
  onClick={() =>
    navigate("/m3/view-data", {
      state: {
        consentId: consent.consentId,
        consent: consent,
      },
    })
  }
  className={`w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white sm:w-auto ${
    isGranted
      ? "bg-teal-600 hover:bg-teal-700"
      : "bg-slate-300 cursor-not-allowed"
  }`}
>
  View Data
</button>
{!isGranted && (
  <p className="mt-2 self-start text-xs text-slate-500 sm:self-center sm:mr-auto">
    Health records will be available after the patient grants consent.
  </p>
)}

        </div>

      </div>
    </ConsentLayout>
  );
};

export default ConsentDetailsPage;