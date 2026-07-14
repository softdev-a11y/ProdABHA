const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

      {/* Total Records */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs text-slate-500">
          Total Records
        </p>

        <p className="mt-2 text-2xl font-bold text-slate-800">
          12
        </p>
      </div>

      {/* Date Range */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs text-slate-500">
          Date Range
        </p>

        <p className="mt-2 text-sm font-semibold text-slate-800">
          01 Jan 2026 - 29 Jun 2026
        </p>
      </div>

      {/* Care Hospital */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs text-slate-500">
          Care Hospital
        </p>

        <p className="mt-2 text-sm font-semibold text-slate-800">
          Care Hospital
        </p>
      </div>

    </div>
  );
};

export default SummaryCards;