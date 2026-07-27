import { useEffect, useState } from "react";
import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
import { Menu, Search } from "lucide-react";
import { useM2 } from "../../hooks/useM2";
import { useUnit } from "../../context/UnitContext";
import toast from "react-hot-toast";

const LinkedHistoryPage = () => {
  const { getLinkedHistory, getLinkedHistoryByDateRange } = useM2();
  const { selectedUnit } = useUnit();

  const [historyData, setHistoryData] = useState<any[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (!selectedUnit) return;

    setHistoryData([]);
    setFilteredHistory([]);
  }, [selectedUnit]);

  const handleSearch = async () => {
    if (!search && (!fromDate || !toDate)) {
      toast.error("Please enter an ABHA Number or select a date range.");
      return;
    }

    if ((fromDate && !toDate) || (!fromDate && toDate)) {
      toast.error("Please select both From Date and To Date.");
      return;
    }

    // Date Range Search
    if (fromDate && toDate) {
      const formattedFromDate = fromDate.replaceAll("-", "");

      const formattedToDate = toDate.replaceAll("-", "");

      const response = await getLinkedHistoryByDateRange(
        selectedUnit,
        formattedFromDate,
        formattedToDate,
      );

      if (response?.success) {
        setHistoryData(response.data);
        setFilteredHistory(response.data);
      }

      return;
    }

    // ABHA Search
    if (search.trim()) {
      const response = await getLinkedHistory(`${search}@sbx`, selectedUnit);

      if (response?.success) {
        setHistoryData(response.data);

        setFilteredHistory(response.data);
      }

      return;
    }

    setHistoryData([]);
    setFilteredHistory([]);
  };

  const handleReset = () => {
    setSearch("");

    setFromDate("");

    setToDate("");

    setHistoryData([]);
    setFilteredHistory([]);
  };

  return (
    <div className="bg-[#f5f7fb] min-h-screen flex">
      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* PAGE */}
      <div className="flex-1 min-w-0 flex flex-col pt-16 lg:pt-0">
        {/* MOBILE TOPBAR */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold text-slate-800">Linked History</h1>

          <div className="w-9 h-9" />
        </div>

        {/* CONTENT */}
        <div className="p-6 lg:p-8 overflow-x-hidden">
          {/* MAIN CARD */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Search & Filter
              </h2>

              <p className="text-xs text-gray-500 mt-2 mb-5">
                Find records by ABHA number or date range
              </p>
            </div>

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
              <div className="w-full">
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
                  {/* ABHA Search */}
                  <div className="w-full sm:w-[220px]">
                    <label className="block text-sm font-medium mb-2">
                      ABHA Number
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search ABHA Number"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#008080]"
                      />

                      <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                    </div>
                  </div>

                  {/* OR */}
                  <div className="hidden sm:block pb-2 font-semibold text-gray-500">
                    OR
                  </div>

                  {/* From Date */}
                  <div className="w-full sm:w-auto">
                    <label className="block text-sm font-medium mb-2">
                      From Date
                    </label>

                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#008080]"
                    />
                  </div>

                  {/* To Date */}
                  <div className="w-full sm:w-auto">
                    <label className="block text-sm font-medium mb-2">
                      To Date
                    </label>

                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#008080]"
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="w-full sm:w-[95px] bg-[#008080] text-white py-2.5 rounded-lg hover:bg-[#006d6d] transition"
                  >
                    Search
                  </button>

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-[95px] border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="w-full max-w-full overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-[900px] w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-semibold text-gray-700">
                    <th className="px-6 py-3">Patient</th>

                    <th className="px-6 py-3">ABHA Number</th>

                    <th className="px-6 py-3">Records</th>

                    <th className="px-6 py-3">Date</th>

                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredHistory.map((item) => {
                    const patient = JSON.parse(item.patientsJson);

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {patient[0].Display}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {item.abhaNumber}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap text-center">
                          {item.careContextCount}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {new Date(item.linkedAtUtc).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                                ${
                                  item.isLinked
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                          >
                            {item.isLinked ? "Success" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-5">
              <p className="text-sm text-gray-500">
                Showing {filteredHistory.length} of {historyData.length} records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedHistoryPage;
