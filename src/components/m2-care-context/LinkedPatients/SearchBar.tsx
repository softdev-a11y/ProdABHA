
interface Props {
  search: string;
  setSearch: (value: string) => void;

  fromDate: string;
  setFromDate: (value: string) => void;

  toDate: string;
  setToDate: (value: string) => void;

  onSearch: () => void;
}

const SearchBar = ({ search, setSearch, fromDate, setFromDate, toDate, setToDate, onSearch }: Props) => {
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-5">

      <h3 className="text-lg font-semibold text-slate-800">
        Search Patient
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Search ABHA eligible patients.
      </p>

   

      {/* Search */}

   <div className="mt-6">

<div className="grid lg:grid-cols-[250px_auto_1fr_auto] gap-5 items-end">

    {/* Name / MR No */}

    <div>

      <label className="block text-sm font-medium mb-2">
        Patient Name / MR No
      </label>

      <input
        type="text"
        placeholder="Enter Patient Name or MR No"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
      />

    </div>

    {/* OR */}

    <div className="flex justify-center items-center pb-2">

      <span className="font-semibold text-gray-500">
        OR
      </span>

    </div>

    {/* Date Range */}

    <div className="grid grid-cols-2 gap-3">

      <div>

        <label className="block text-sm font-medium mb-2">
          From Date
        </label>

       <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-3"
        />

      </div>

      <div>

        <label className="block text-sm font-medium mb-2">
          To Date
        </label>

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-3"
        />

      </div>

    </div>

    <button
      onClick={onSearch}
      className="bg-teal-600 text-white rounded-lg px-6 py-3 hover:bg-teal-700"
    >
      Search
    </button>

  </div>

</div>

    </div>
  );
};

export default SearchBar;