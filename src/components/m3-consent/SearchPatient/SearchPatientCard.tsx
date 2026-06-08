import { useState } from "react";
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

  const [error, setError] =
    useState("");

  const [showHint, setShowHint] =
    useState(false);

  const validateAbhaAddress =
    () => {

      const value =
        abhaAddress.trim();

      if (!value) {
        return "ABHA Address is required";
      }

      const abhaRegex =
        /^[a-z][a-z0-9]*@[a-z]+$/;

      if (
        !abhaRegex.test(value)
      ) {
        return "Enter valid ABHA Address (e.g. dhananjay07@sbx)";
      }

      return "";
    };

  const handleChange = (
    value: string
  ) => {

    let formattedValue =
      value.toLowerCase();

    // Remove spaces
    formattedValue =
      formattedValue.replace(
        /\s/g,
        ""
      );

    // Allow only a-z, 0-9 and @
    formattedValue =
      formattedValue.replace(
        /[^a-z0-9@]/g,
        ""
      );

    // First character should not be a number
    if (
      formattedValue.length === 1 &&
      /[0-9]/.test(
        formattedValue
      )
    ) {
      return;
    }

    // Allow only one @
    const parts =
      formattedValue.split("@");

    if (
      parts.length > 2
    ) {
      return;
    }

    setAbhaAddress(
      formattedValue
    );

    if (error) {
      setError("");
    }
  };

  const handleSearch =
    () => {

      const validationError =
        validateAbhaAddress();

      if (
        validationError
      ) {

        setError(
          validationError
        );

        return;
      }

      setError("");

      onSearch();
    };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (
      e.key === "Enter"
    ) {

      handleSearch();
    }
  };

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
              handleChange(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            onFocus={() =>
              setShowHint(true)
            }
            onBlur={() =>
              setShowHint(false)
            }
            placeholder="Enter ABHA address (e.g. dhananjay07@sbx)"
            className={`w-full h-[52px] rounded-xl bg-white px-4 pr-12 text-[14px] outline-none transition-all ${
              error
                ? "border border-red-500 focus:ring-2 focus:ring-red-100 focus:border-red-500"
                : "border border-[#d1d5db] focus:border-[#2563eb] focus:ring-2 focus:ring-[#dbeafe]"
            }`}
          />

          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />

        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            {error}
          </p>
        )}

        {/* Hint Message */}
        {showHint && !error && (
          <p className="mt-2 text-xs text-gray-500">
            Enter a valid ABHA address
            (e.g. dhananjay07@sbx)
          </p>
        )}

        {/* Button */}
        <div className="flex justify-end mt-8">

          <button
            onClick={
              handleSearch
            }
            className="h-[42px] px-5 rounded-[10px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[14px] font-semibold transition-all"
          >
            Search Patient
          </button>

        </div>

      </div>
    </div>
  );
};

export default SearchPatientCard;