import { useState } from "react";
import { Search } from "lucide-react";

interface SearchPatientCardProps {
  onSearch: (searchText: string) => void;
  loading: boolean;
}

const SearchPatientCard = ({
  onSearch,
  loading,
}: SearchPatientCardProps) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Search Patient
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Search patient using Patient Name or MR No.
        </p>
      </div>

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

        {/* Search Field */}
        <div className="md:col-span-10">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Patient Name / MR No
          </label>

          <input
            type="text"
            value={searchText}
            placeholder="Enter Patient Name or MR No"
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-teal-600"
          />
        </div>

        {/* Search Button */}
        <div className="md:col-span-2">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-600 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Search size={18} />

            {loading ? "Searching..." : "Search"}
          </button>
        </div>

      </div>

    </div>
  );
};

export default SearchPatientCard;