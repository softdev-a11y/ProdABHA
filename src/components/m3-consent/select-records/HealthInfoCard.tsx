interface Props {
  title: string;
  description: string;
  icon: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

const HealthInfoCard = ({
  title,
  description,
  icon,
  color,
  selected,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        border
        rounded-[14px]
        p-3
        sm:p-4
        cursor-pointer
        transition-all
        bg-white
        hover:shadow-sm
        min-h-[125px]
        sm:min-h-[140px]
        w-full
        overflow-hidden
        ${
          selected
            ? "border-[#2563eb] shadow-sm"
            : "border-[#e5e7eb]"
        }
      `}
    >
      {/* Checkbox */}
      <div
        className={`
          absolute
          top-3
          right-3
          w-[16px]
          h-[16px]
          rounded-[4px]
          border
          flex
          items-center
          justify-center
          ${
            selected
              ? "bg-[#2563eb] border-[#2563eb]"
              : "border-[#d1d5db]"
          }
        `}
      >
        {selected && (
          <div className="w-[6px] h-[6px] bg-white rounded-full" />
        )}
      </div>

      {/* Icon */}
      <div
        className="
          w-[42px]
          h-[42px]
          sm:w-[48px]
          sm:h-[48px]
          rounded-[12px]
          flex
          items-center
          justify-center
          text-[20px]
          sm:text-[22px]
        "
        style={{
          backgroundColor: color,
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3
          className="
            text-[15px]
            sm:text-[16px]
            font-semibold
            text-[#111827]
            leading-snug
            break-words
          "
        >
          {title}
        </h3>

        <p
          className="
            text-[12px]
            sm:text-[13px]
            text-[#6b7280]
            mt-1.5
            leading-[18px]
            break-words
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default HealthInfoCard;