const PatientSummary = () => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-3">
        <p className="text-[10px] text-[#94a3b8]">
          Patient
        </p>

        <h3 className="mt-1 text-[13px] font-semibold text-[#111827] break-words">
          john@sbx
        </h3>
      </div>

      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-3">
        <p className="text-[10px] text-[#94a3b8]">
          Consent Purpose
        </p>

        <h3 className="mt-1 text-[13px] font-semibold text-[#111827]">
          Care Management
        </h3>
      </div>

      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-3">
        <p className="text-[10px] text-[#94a3b8]">
          Records Retrieved
        </p>

        <h3 className="mt-1 text-[13px] font-semibold text-[#111827]">
          3 Records
        </h3>
      </div>

    </div>
  );
};

export default PatientSummary;