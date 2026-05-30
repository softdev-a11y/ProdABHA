interface Props {
  onSubmit: () => void;
  onBack: () => void;
}

const ConsentForm = ({
  onSubmit,
  onBack,
}: Props) => {
  return (
    <>
      {/* Purpose */}
      <div className="mt-6">
        <label className="block text-[13px] sm:text-[14px] font-semibold text-[#111827] mb-2">
          Purpose of Access
        </label>

        <select className="w-full h-[44px] border border-[#d1d5db] rounded-[12px] px-4 text-[13px] sm:text-[14px] outline-none bg-white">
          <option>Care Management</option>
          <option>Treatment</option>
          <option>Insurance</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="mt-6">
        <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#111827] mb-3">
          Date Range
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <input
            type="date"
            defaultValue="2025-01-01"
            className="w-full h-[44px] border border-[#d1d5db] rounded-[12px] px-4 text-[13px] sm:text-[14px] outline-none"
          />

          <input
            type="date"
            defaultValue="2026-05-01"
            className="w-full h-[44px] border border-[#d1d5db] rounded-[12px] px-4 text-[13px] sm:text-[14px] outline-none"
          />

        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-8">

        <button
          onClick={onBack}
          className="h-[36px] w-full sm:w-auto px-3 rounded-[8px] border border-[#d1d5db] text-[#374151] text-[11px] font-semibold bg-white"
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          className="h-[36px]  sm:w-auto px-3 rounded-[8px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-semibold"
        >
          Request Consent
        </button>

      </div>
    </>
  );
};

export default ConsentForm;