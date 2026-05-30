interface Props {
  id: string;
  patient: string;
  purpose: string;
  requestedAt: string;
}

const PendingRequestCard = ({
  id,
  patient,
  purpose,
  requestedAt,
}: Props) => {
  return (
    <div className="border border-[#e5e7eb] rounded-[16px] bg-white p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      {/* Left */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1">

        <div>
          <p className="text-[11px] text-[#9ca3af]">
            Request ID
          </p>

          <h3 className="text-[16px] font-semibold text-[#111827] mt-1">
            {id}
          </h3>
        </div>

        <div>
          <p className="text-[11px] text-[#9ca3af]">
            Patient
          </p>

          <h4 className="text-[14px] font-medium text-[#111827] mt-1 break-words">
            {patient}
          </h4>
        </div>

        <div>
          <p className="text-[11px] text-[#9ca3af]">
            Purpose
          </p>

          <h4 className="text-[14px] font-medium text-[#111827] mt-1">
            {purpose}
          </h4>
        </div>

      </div>

      {/* Right */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">

        <div className="bg-[#fff7ed] text-[#ea580c] px-3 py-2 rounded-full text-[12px] font-medium w-fit">
          Pending Approval
        </div>

        <p className="text-[11px] text-[#9ca3af]">
          Requested {requestedAt}
        </p>

      </div>
    </div>
  );
};

export default PendingRequestCard;