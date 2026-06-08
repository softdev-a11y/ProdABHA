import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import HealthInfoCard from "../../components/m3-consent/select-records/HealthInfoCard";


const SelectRecordsPage = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string[]>([]);
const [error, setError] = useState("");
  const records = [
    {
      title: "Prescription",
      description: "Medications prescribed by doctor",
      icon: "💊",
      color: "#f0fdf4",
    },
    {
      title: "Diagnostic Report",
      description: "Lab tests and diagnostic reports",
      icon: "🧪",
      color: "#eff6ff",
    },
    {
      title: "OP Consultation",
      description: "OP visit and consultation details",
      icon: "🩺",
      color: "#f5f3ff",
    },
    {
      title: "Wellness Record",
      description: "Wellness and health screening records",
      icon: "💗",
      color: "#fdf2f8",
    },
    {
      title: "Discharge Summary",
      description: "Inpatient discharge summary",
      icon: "📋",
      color: "#fff7ed",
    },
    {
      title: "Procedure Record",
      description: "Details of procedures and surgeries",
      icon: "📄",
      color: "#f0f9ff",
    },
  ];

  const toggleSelection = (title: string) => {
    setSelected((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleNext = () => {

  if (selected.length === 0) {

    setError(
      "Please select at least one health information type."
    );

    return;
  }

  setError("");

  navigate(
    "/m3/request-consent"
  );
};

  return (
    <ConsentLayout currentStep={2}>
      <div className="bg-white border border-[#e5e7eb] rounded-[18px] shadow-sm p-4 sm:p-5 md:p-6 max-w-[940px] w-full overflow-hidden">

        {/* Heading */}
        <h1 className="text-[20px] sm:text-[26px] md:text-[30px] font-bold text-[#111827] leading-tight break-words">
          Select Records
        </h1>

        <p className="text-[12px] sm:text-[13px] text-[#6b7280] mt-2 leading-relaxed">
          Select the health information you want to access.
        </p>

        {/* Patient Details */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border border-[#eef2f7] rounded-[14px] p-3 bg-[#fafcff]">

          <div className="min-w-0">
            <p className="text-[10px] text-[#9ca3af]">
              ABHA Address
            </p>

            <h3 className="text-[13px] font-semibold text-[#111827] mt-1 break-words">
              dhananjay07@sbx
            </h3>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] text-[#9ca3af]">
              Patient Reference
            </p>

            <h3 className="text-[13px] font-semibold text-[#111827] mt-1 break-words">
              PATIENT-1001
            </h3>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] text-[#9ca3af]">
              Discovered On
            </p>

            <h3 className="text-[13px] font-semibold text-[#111827] mt-1">
              22 May 2026
            </h3>
          </div>

        </div>

        {/* HI TYPES */}
        <div className="mt-7">

          <h2 className="text-[17px] sm:text-[18px] font-bold text-[#111827] leading-snug">
            Available Health Information Types
          </h2>

          <p className="text-[11px] sm:text-[12px] text-[#6b7280] mt-1.5 leading-relaxed">
            Choose the types of health information you want to access.
          </p>

          {/* Cards */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {records.map((item) => (
              <HealthInfoCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                color={item.color}
                selected={selected.includes(item.title)}
                onClick={() => toggleSelection(item.title)}
              />
            ))}

          </div>
        </div>

        {error && (
  <p className="mt-4 text-sm text-red-600 font-medium">
    {error}
  </p>
)}

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mt-7">

          <button
        
            onClick={() => navigate("/m3/request-consent")}
            className="h-[40px] w-full sm:w-auto px-4 rounded-[10px] border border-[#d1d5db] text-[#374151] text-[12px] font-semibold bg-white"
          >
            Back
          </button>

          <button
             onClick={handleNext}
           className="h-[36px]  sm:w-auto px-3 rounded-[8px] bg-[#2563eb] text-white text-[11px] font-semibold"
          >
            Next: Request Consent
          </button>

        </div>
        
      </div>
    </ConsentLayout>
  );
};

export default SelectRecordsPage;