   import { useEffect, useState } from "react";
      import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
      import { Menu, Search } from "lucide-react";
      import { useM2 } from "../../hooks/useM2";

   

      const LinkedHistoryPage = () => {
        const { getLinkedHistory,  getLinkedHistoryByDateRange,} = useM2();

        const [historyData, setHistoryData] =
        useState<any[]>([]);

        const [sidebarOpen, setSidebarOpen] =
          useState(false);
          const [collapsed, setCollapsed] = useState(false);

      const [search, setSearch] = useState("");
      const [filteredHistory, setFilteredHistory] = useState<any[]>([]);

      const [fromDate, setFromDate] = useState("");

      const [toDate, setToDate] = useState("");

      useEffect(() => {

          loadHistory();

      }, []);

              const loadHistory = async () => {

            const patientData = JSON.parse(
                localStorage.getItem("patientData") || "{}"
            );


            const response =
            await getLinkedHistory(
                patientData.abhaAddress
            );

            console.log(
                "LINKED HISTORY",
                response
            );

            if(response?.success){

                setHistoryData(
                    response.data
                );
                 setFilteredHistory(
                    response.data
                );

            }

        };

                const handleSearch = async () => {
                  if (!search && (!fromDate || !toDate)) {
              alert("Please enter an ABHA Number or select a date range.");
              return;
            }

            if ((fromDate && !toDate) || (!fromDate && toDate)) {
              alert("Please select both From Date and To Date.");
              return;
            }

          // Date Range Search
          if (fromDate && toDate) {
            const formattedFromDate = fromDate.replaceAll("-", "");

            const formattedToDate = toDate.replaceAll("-", "");

            const response =
              await getLinkedHistoryByDateRange(
                formattedFromDate,
                formattedToDate
              );

            if (response?.success) {
              setHistoryData(response.data);
              setFilteredHistory(response.data);
            }

            return;
          }

       // ABHA Search
          if (search.trim()) {

            const response = await getLinkedHistory(
              `${search}@sbx`
            );

            if (response?.success) {

              setHistoryData(response.data);

              setFilteredHistory(response.data);

            }

            return;
          }

          loadHistory();

        };

        const handleReset = () => {

            setSearch("");

            setFromDate("");

            setToDate("");

            loadHistory();

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
      <div className="flex-1 flex flex-col">

              {/* MOBILE TOPBAR */}
              <div className="lg:hidden h-[60px] bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-30">

                <button
                  onClick={() => setSidebarOpen(true)}
                  className="bg-[#008080] text-white p-2 rounded-lg"
                >
                  <Menu size={22} />
                </button>

                <h1 className="flex-1 text-center text-lg font-semibold text-[#1e293b] pr-10">
                  Linked History
                </h1>

              </div>

              {/* CONTENT */}
              <div className="p-4 lg:p-8">

                {/* DESKTOP TITLE */}
                <div className="hidden lg:block mb-6">

                  <h1 className="text-3xl font-bold text-[#1e293b]">
                    Linked Records History
                  </h1>

                  <p className="text-gray-500 text-sm mt-1">
                    View previously linked care contexts
                  </p>

                </div>

                {/* MAIN CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 lg:p-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        History
                      </h2>

                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        Previously linked patient records
                      </p>
                    </div>

                  {/* HEADER */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                  

                 <div className="w-full">

                <div className="flex items-end gap-8 flex-wrap">

                      {/* ABHA Search */}
                     <div className="w-[220px]">
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
                      <div className="pb-2 font-semibold text-gray-500">
                        OR
                      </div>

                      {/* From Date */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          From Date
                        </label>

                        <input
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#008080]"
                        />
                      </div>

                      {/* To Date */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          To Date
                        </label>

                        <input
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#008080]"
                        />
                      </div>

                      {/* Search Button */}
                   <button
                      onClick={handleSearch}
                      className="w-[95px] bg-[#008080] text-white py-2.5 rounded-lg hover:bg-[#006d6d] transition"
                    >
                      Search
                    </button>

                      {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="w-[95px] border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100 transition"
                  >
                    Reset
                  </button>

                    </div>

                  </div>

                  </div>

                  {/* TABLE */}
                  <div className="overflow-x-auto border border-gray-200 rounded-xl">

                    <table className="w-[900px] lg:w-full">

                      <thead className="bg-[#f8fafc]">

                        <tr className="text-left text-sm text-gray-600">

                          <th className="px-6 py-4 font-semibold">
                            Patient
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            ABHA Number
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            Linked Records
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            Linked On
                          </th>

                          <th className="px-6 py-4 font-semibold">
                            Status
                          </th>

                        </tr>

                      </thead>

                    <tbody>

                        {filteredHistory.map((item) => {

                          const patient = JSON.parse(
                            item.patientsJson
                          );

                          return (

                            <tr
                            key={item.id}
                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                          >

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                              {patient[0].Display}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                            {item.abhaNumber}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                             {item.careContextCount}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                            {new Date(item.linkedAtUtc).toLocaleDateString()}
                            </td>

                            <td className="px-6 py-5">

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
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-6">

                   <p className="text-sm text-gray-500">
                    Showing 1 to {filteredHistory.length} of {historyData.length} records
                  </p>

                  

                  </div>

                </div>

              

              </div>

            </div>
          </div>
        );
      };

      export default LinkedHistoryPage;