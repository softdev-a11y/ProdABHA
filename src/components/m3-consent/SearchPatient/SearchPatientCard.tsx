import { Search } from "lucide-react";

interface Props {
  abhaAddress: string;
  setAbhaAddress: (
    value: string
  ) => void;
  onSearch: () => void;
}

const SearchPatientCard = ({
  abhaAddress,
  setAbhaAddress,
  onSearch,
}: Props) => {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[20px] px-8 py-8 shadow-sm max-w-[1100px]">

      {/* Heading */}
      <h1 className="text-[24px] lg:text-[26px] font-bold text-[#111827] leading-tight">
        Search Patient
      </h1>

      {/* Description */}
      <p className="mt-3 text-[14px] text-[#6b7280] max-w-[700px] leading-relaxed">
        Search patient using their ABHA
        address to discover available
        health records.
      </p>

      {/* Form */}
      <div className="mt-10">

        <label className="block text-[14px] font-semibold text-[#111827] mb-3">
          ABHA Address
        </label>

        {/* Input */}
        <div className="relative">

          <input
            value={abhaAddress}
            onChange={(e) =>
              setAbhaAddress(
                e.target.value
              )
            }
            placeholder="Enter ABHA address (e.g. john@sbx)"
            className="w-full h-[52px] rounded-xl border border-[#d1d5db] bg-white px-4 pr-12 text-[14px] outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
          />

          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />

        </div>

        {/* Info Box */}
        <div className="mt-5 border border-[#e5e7eb] bg-[#f9fafb] rounded-xl px-4 py-4 text-[13px] text-[#6b7280]">
          Enter a valid ABHA address to
          search for patient health
          records.
        </div>

        {/* Button */}
        <div className="flex justify-end mt-8">

          <button
            onClick={onSearch}
            className="h-[42px] px-5 rounded-[10px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold transition-all"
          >
            Search Patient
          </button>

        </div>
      </div>
    </div>
  );
};

export default SearchPatientCard;