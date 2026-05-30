const RequestSummary = () => {
  return (
    <div className="border border-[#e5e7eb] rounded-[16px] p-4 bg-[#fafcff] h-fit">

      <div className="flex items-center gap-2">

        <div className="w-8 h-8 rounded-lg bg-[#e8f8ee] flex items-center justify-center text-[13px]">
          ✓
        </div>

        <h3 className="text-[15px] font-semibold text-[#111827]">
          Request Summary
        </h3>

      </div>

      <div className="mt-5 space-y-4">

        <div>
          <p className="text-[10px] text-[#9ca3af]">
            Patient
          </p>

          <h4 className="text-[13px] font-semibold text-[#111827] mt-1">
            john@sbx
          </h4>
        </div>

        <div>
          <p className="text-[10px] text-[#9ca3af]">
            Purpose
          </p>

          <h4 className="text-[13px] font-semibold text-[#111827] mt-1">
            Care Management
          </h4>
        </div>

        <div>
          <p className="text-[10px] text-[#9ca3af]">
            Date Range
          </p>

          <h4 className="text-[13px] font-semibold text-[#111827] mt-1">
            01 Jan 2025 to 01 May 2026
          </h4>
        </div>

      </div>
    </div>
  );
};

export default RequestSummary;