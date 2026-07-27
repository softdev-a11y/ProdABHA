import { useEffect, useState } from "react";
import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
import { Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmLinkModal from "../../components/m2-care-context/ConfirmationModal/ConfirmLinkModal";
import { useM2 } from "../../hooks/useM2";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const PatientRecordListingPage = () => {
  type SelectedCareContext = {
    hiType: string;
    referenceNumber: string;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hiTypes, setHiTypes] = useState<any[]>([]);
  const location = useLocation();

  const patientData = location.state as any;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { getCareContexts } = useM2();

  const [selectedCareContexts, setSelectedCareContexts] = useState<
    SelectedCareContext[]
  >([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSelection = (hiType: string, recordId: string) => {
    setSelectedCareContexts((prev) =>
      prev.some(
        (item) => item.hiType === hiType && item.referenceNumber === recordId,
      )
        ? prev.filter(
            (item) =>
              !(item.hiType === hiType && item.referenceNumber === recordId),
          )
        : [...prev, { hiType, referenceNumber: recordId }],
    );
  };

  useEffect(() => {
    loadCareContexts();
  }, []);

  const loadCareContexts = async () => {
    const response = await getCareContexts(
      patientData.unitCode,
      patientData.mrno,
    );

    console.log(response);

    if (response?.success) {
      setHiTypes(response.data.careContextGroups);
    }
  };
  const handleConfirmLinking = async () => {
    try {
      if (isSubmitting) return;

      if (!selectedCareContexts.length) {
        toast.error("Please select at least one care context.");
        return;
      }

      setIsSubmitting(true);

      // SELECTED RECORDS

      console.log("PATIENT DATA", patientData);

      const tokenPayload = {
        unitCode: patientData?.unitCode,

        abhaAddress: patientData?.abhaAddress,

        abhaNumber: patientData?.abhaNumber,

        name: patientData?.patName,

        gender: patientData?.patSex,

        yearOfBirth: Number(patientData?.dateOfBirth?.substring(0, 4)),

        mobileNumber: patientData?.patMobile,
      };

      const preparedCareContexts = hiTypes
        .flatMap((section: any) =>
          section.records.map((record: any) => ({
            ...record,
            hiType: section.hiType,
          })),
        )
        .filter((record: any) =>
          selectedCareContexts.some(
            (item) =>
              item.hiType === record.hiType &&
              item.referenceNumber === record.referenceNumber,
          ),
        )
        .map((record: any) => ({
          referenceNumber: record.referenceNumber,
          display: record.display,
        }));

      const patientPayload = [
        {
          referenceNumber: patientData?.mrno,
          display: patientData?.patName,
          hiType: "Prescription",
          count: preparedCareContexts.length,

          careContexts: preparedCareContexts,
        },
      ];

      console.log("TOKEN PAYLOAD", tokenPayload);

      const patientMobile = String(patientData?.patMobile || "").trim();

      const workflowInit = {
        patientData,
        patientMobile,
        tokenPayload,
        patientPayload,
        selectedCareContexts,
        selectedCareContextCount: preparedCareContexts.length,
        createdAt: new Date().toISOString(),
      };

      setOpenModal(false);

      navigate("/processing", {
        state: {
          workflowInit,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to start linking workflow. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5f7fb] min-h-screen flex">
      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* PAGE CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col pt-16 lg:pt-0">
        {/* MOBILE TOPBAR */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold text-slate-800">Patient Records</h1>

          <div className="w-9 h-9" />
        </div>

        {/* PAGE */}
        <div className="p-4 lg:p-6">
          {/* DESKTOP TITLE */}
          <div className="hidden lg:block mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Patient Record Listing
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Show all available records of selected patient
            </p>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 lg:p-5">
            {/* TOP */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
              {/* BACK */}
              <button
                onClick={() => navigate("/linkedpatients")}
                className="flex items-center gap-2 text-[#008080] font-medium text-sm"
              >
                <ArrowLeft size={18} />
                Back to Patients
              </button>

              {/* PATIENT INFO */}
              <div className="text-left lg:text-center">
                <h2 className="text-base font-semibold text-gray-900">
                  {patientData?.patName} ({patientData?.mrno})
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  ABHA: {patientData?.abhaNumber} | {patientData?.abhaAddress}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Mobile: {patientData?.patMobile || "-"}
                </p>
              </div>

              <div className="hidden lg:block w-[120px]" />
            </div>

            {/* AVAILABLE RECORDS */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Available Records
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                Select the records you want to link to ABHA
              </p>

              <div className="space-y-3">
                {hiTypes.map((section) => (
                  <div
                    key={section.hiType}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      className="w-full flex justify-between items-center px-4 py-2.5 bg-gray-50 text-sm font-semibold text-[#008080]"
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === section.hiType
                            ? null
                            : section.hiType,
                        )
                      }
                    >
                      <span>{section.hiType}</span>

                      <span>
                        {expandedSection === section.hiType ? "−" : "+"}
                      </span>
                    </button>

                    {expandedSection === section.hiType && (
                      <div className="p-3 space-y-2">
                        {section.records.map((record: any) => (
                          <label
                            key={record.referenceNumber}
                            className="flex items-center gap-2.5"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCareContexts.some(
                                (item) =>
                                  item.hiType === section.hiType &&
                                  item.referenceNumber ===
                                    record.referenceNumber,
                              )}
                              onChange={() =>
                                toggleSelection(
                                  section.hiType,
                                  record.referenceNumber,
                                )
                              }
                              className="w-4 h-4 accent-[#008080]"
                            />

                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {record.display}
                              </p>

                              <p className="text-xs text-gray-500">
                                {record.description}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex flex-col lg:flex-row items-center justify-end gap-3 mt-4">
              <button
                onClick={() => navigate("/linkedpatients")}
                className="w-full lg:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => setOpenModal(true)}
                disabled={selectedCareContexts.length === 0 || isSubmitting}
                className={`w-full lg:w-auto px-6 py-2.5 rounded-lg text-sm text-white transition
                    ${
                      selectedCareContexts.length === 0 || isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                    }`}
              >
                Link Records
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmLinkModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmLinking}
        patient={patientData}
        hiTypes={hiTypes}
        selectedCareContexts={selectedCareContexts}
        confirmDisabled={isSubmitting}
      />
    </div>
  );
};

export default PatientRecordListingPage;
