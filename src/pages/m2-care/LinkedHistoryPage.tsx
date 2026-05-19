      import { useState } from "react";
      import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
      import { Menu, Search } from "lucide-react";

      const historyData = [
        {
          id: 1,
          patient: "Ravi Kumar",
          uhid: "UH12345",
          linkedRecords: 12,
          linkedOn: "30 May 2024",
          status: "Success",
        },
        {
          id: 2,
          patient: "Sita Devi",
          uhid: "UH12346",
          linkedRecords: 8,
          linkedOn: "29 May 2024",
          status: "Success",
        },
        {
          id: 3,
          patient: "Mohammed Ali",
          uhid: "UH12347",
          linkedRecords: 5,
          linkedOn: "28 May 2024",
          status: "Pending",
        },
        {
          id: 4,
          patient: "Anita Sharma",
          uhid: "UH12348",
          linkedRecords: 10,
          linkedOn: "27 May 2024",
          status: "Success",
        },
      ];

      const LinkedHistoryPage = () => {

        const [sidebarOpen, setSidebarOpen] =
          useState(false);
          const [collapsed, setCollapsed] = useState(false);

        const [search, setSearch] = useState("");

        const filteredHistory = historyData.filter((item) =>
          `${item.patient} ${item.uhid}`
            .toLowerCase()
            .includes(search.toLowerCase())
        );

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

                  {/* HEADER */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        History
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Previously linked patient records
                      </p>
                    </div>

                    {/* SEARCH */}
                    <div className="relative w-full lg:w-[320px]">

                      <input
                        type="text"
                        placeholder="Search patient or UHID"
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-12 outline-none focus:ring-2 focus:ring-[#008080]"
                      />

                      <Search
                        size={18}
                        className="absolute right-4 top-3 text-gray-400"
                      />

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
                            UHID
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

                        {filteredHistory.map((item) => (

                          <tr
                            key={item.id}
                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                          >

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                              {item.patient}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                              {item.uhid}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                              {item.linkedRecords}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                              {item.linkedOn}
                            </td>

                            <td className="px-6 py-5">

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium
                                ${
                                  item.status === "Success"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {item.status}
                              </span>

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {/* FOOTER */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-6">

                    <p className="text-sm text-gray-500">
                      Showing 1 to 4 of 24 records
                    </p>

                    <div className="flex items-center gap-2">

                      <button className="w-8 h-8 border border-gray-300 rounded text-sm hover:bg-gray-100">
                        {"<"}
                      </button>

                      <button className="w-8 h-8 bg-[#008080] text-white rounded text-sm">
                        1
                      </button>

                      <button className="w-8 h-8 border border-gray-300 rounded text-sm hover:bg-gray-100">
                        2
                      </button>

                      <button className="w-8 h-8 border border-gray-300 rounded text-sm hover:bg-gray-100">
                        {">"}
                      </button>

                    </div>

                  </div>

                </div>

              

              </div>

            </div>
          </div>
        );
      };

      export default LinkedHistoryPage;