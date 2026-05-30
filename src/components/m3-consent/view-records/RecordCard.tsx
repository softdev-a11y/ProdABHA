interface Props {
  type: string;
  doctor: string;
  date: string;
  details: string[];
  icon: string;
  color: string;
}

const RecordCard = ({
  type,
  doctor,
  date,
  details,
  icon,
  color,
}: Props) => {
  return (
    <div className="border border-[#e5e7eb] rounded-[16px] bg-white px-4 py-3 hover:shadow-sm transition-all">

      {/* Top */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        {/* Left */}
        <div className="flex gap-3 min-w-0 flex-1">

          {/* Icon */}
          <div
            className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[18px] shrink-0"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">

            {/* Title + Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

              <h2 className="text-[15px] sm:text-[16px] font-semibold text-[#111827] leading-tight">
                {type}
              </h2>

              <p className="text-[11px] text-[#94a3b8] shrink-0">
                {date}
              </p>

            </div>

            {/* Doctor */}
            <p className="mt-1 text-[12px] text-[#64748b]">
              {doctor}
            </p>

            {/* Details */}
            <div className="mt-3 flex flex-wrap gap-2">

              {details.map((detail, index) => (
                <div
                  key={index}
                  className="px-2.5 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[11px] text-[#475569]"
                >
                  {detail}
                </div>
              ))}

            </div>

          </div>
        </div>

        {/* Download */}
        <button className="h-[34px] px-3 rounded-[10px] border border-[#d1d5db] bg-white text-[#374151] text-[11px] font-semibold hover:bg-[#f8fafc] transition-all w-full sm:w-auto shrink-0">
          Download
        </button>

      </div>
    </div>
  );
};

export default RecordCard;