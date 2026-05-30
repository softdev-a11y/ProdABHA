const SelectedTypes = () => {
  return (
    <div>
      <h3 className="text-[15px] font-semibold text-[#111827]">
        Selected Health Information (HI) Types
      </h3>

      <div className="flex flex-wrap gap-2 mt-4">

        <div className="bg-[#e8f8ee] text-[#15803d] px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium">
          Prescription
        </div>

        <div className="bg-[#f3ecff] text-[#7c3aed] px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium">
          Diagnostic Report
        </div>

        <div className="bg-[#e8f0ff] text-[#2563eb] px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium">
          OP Consultation
        </div>

      </div>
    </div>
  );
};

export default SelectedTypes;