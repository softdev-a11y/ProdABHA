import { Search } from "lucide-react";

const SearchPatientCard = () => {
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

        {/* Patient Name */}
        <div className="md:col-span-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Patient Name
          </label>

          <input
            type="text"
            placeholder="Enter patient name"
            className="h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-teal-600"
          />
        </div>

        {/* OR */}
        <div className="flex items-center justify-center md:col-span-1">
          <span className="text-sm font-semibold text-slate-500">
            OR
          </span>
        </div>

        {/* MR No */}
        <div className="md:col-span-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            MR No
          </label>

          <input
            type="text"
            placeholder="Enter MR No"
            className="h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-teal-600"
          />
        </div>

        {/* Search Button */}
        <div className="md:col-span-2">
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-600 font-medium text-white transition hover:bg-teal-700">
            <Search size={18} />
            Search
          </button>
        </div>

      </div>

    </div>
  );
};

export default SearchPatientCard;