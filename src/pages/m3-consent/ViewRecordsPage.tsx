import { useNavigate } from "react-router-dom";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";

import PatientSummary from "../../components/m3-consent/view-records/PatientSummary";

import RecordCard from "../../components/m3-consent/view-records/RecordCard";

const records = [
  {
    id: 1,
    type: "Prescription",
    doctor: "Dr. Harish",
    date: "20 May 2026",
    details: [
      "Paracetamol 500mg",
      "Vitamin D",
      "Pantoprazole",
    ],
    icon: "💊",
    color: "#f0fdf4",
  },

  {
    id: 2,
    type: "Diagnostic Report",
    doctor: "Dr. Kumar",
    date: "12 Apr 2026",
    details: [
      "Blood Test",
      "Hemoglobin Normal",
      "Sugar Normal",
    ],
    icon: "🧪",
    color: "#eff6ff",
  },

  {
    id: 3,
    type: "OP Consultation",
    doctor: "Dr. Ramesh",
    date: "08 Mar 2026",
    details: [
      "General Fever",
      "Suggested Rest",
      "Hydration Advised",
    ],
    icon: "🩺",
    color: "#f5f3ff",
  },
];

const ViewRecordsPage = () => {
  const navigate = useNavigate();

  return (
    <ConsentLayout currentStep={5}>
      <div className="w-full max-w-[940px] bg-white border border-[#e5e7eb] rounded-[18px] shadow-sm p-4 sm:p-5 lg:p-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

          <div className="min-w-0">

            <h1 className="text-[18px] sm:text-[22px] lg:text-[26px] font-bold text-[#111827] leading-tight">
              Patient Health Records
            </h1>

            <p className="mt-1.5 text-[11px] sm:text-[12px] text-[#6b7280] leading-relaxed">
              View patient records shared through consent.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

            <button className="h-[36px] px-3 rounded-[9px] border border-[#d1d5db] bg-white text-[#374151] text-[11px] font-semibold w-full sm:w-auto">
              Download All
            </button>

            <button
              onClick={() =>
                navigate("/m3/search-patient")
              }
              className="h-[36px] px-3 rounded-[9px] bg-[#2563eb] text-white text-[11px] font-semibold w-full sm:w-auto"
            >
              New Search
            </button>

          </div>
        </div>

        {/* Summary */}
        <PatientSummary />

        {/* Records */}
        <div className="mt-5 space-y-3">

          {records.map((record) => (
            <RecordCard
              key={record.id}
              type={record.type}
              doctor={record.doctor}
              date={record.date}
              details={record.details}
              icon={record.icon}
              color={record.color}
            />
          ))}

        </div>

        {/* Bottom Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">

          <button
            onClick={() =>
              navigate("/m3/pending-requests")
            }
            className="h-[36px] px-3 rounded-[9px] border border-[#d1d5db] bg-white text-[#374151] text-[11px] font-semibold w-full sm:w-auto"
          >
            Back
          </button>

          <button
            onClick={() =>
              navigate("/m3/search-patient")
            }
            className="h-[36px] px-3 rounded-[9px] bg-[#2563eb] text-white text-[11px] font-semibold"
          >
            Done
          </button>

        </div>
      </div>
    </ConsentLayout>
  );
};

export default ViewRecordsPage;