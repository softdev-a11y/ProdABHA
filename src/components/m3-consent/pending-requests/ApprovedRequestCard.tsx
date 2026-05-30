interface Props {
  id: string;
  patient: string;
  purpose: string;
  onView: () => void;
}

const ApprovedRequestCard = ({
  id,
  patient,
  purpose,
  onView,
}: Props) => {
  return (
    <div className="border border-[#dcfce7] bg-[#f0fdf4] rounded-[16px] p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      {/* Left */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1">

        <div>
          <p className="text-[11px] text-[#65a30d]">
            Request ID
          </p>

          <h3 className="text-[16px] font-semibold text-[#166534] mt-1">
            {id}
          </h3>
        </div>

        <div>
          <p className="text-[11px] text-[#65a30d]">
            Patient
          </p>

          <h4 className="text-[14px] font-medium text-[#166534] mt-1 break-words">
            {patient}
          </h4>
        </div>

        <div>
          <p className="text-[11px] text-[#65a30d]">
            Purpose
          </p>

          <h4 className="text-[14px] font-medium text-[#166534] mt-1">
            {purpose}
          </h4>
        </div>

      </div>

      {/* Right */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">

        <div className="bg-[#16a34a] text-white px-3 py-2 rounded-full text-[12px] font-medium w-fit">
          Approved
        </div>

        <button
          onClick={onView}
          className="h-[40px] px-5 rounded-[10px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold"
        >
          View Records
        </button>

      </div>
    </div>
  );
};

export default ApprovedRequestCard;