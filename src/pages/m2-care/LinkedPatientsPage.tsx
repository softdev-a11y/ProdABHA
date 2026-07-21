    import { useState } from "react";
    import SearchBar from "../../components/m2-care-context/LinkedPatients/SearchBar";
    import PatientTable from "../../components/m2-care-context/LinkedPatients/PatientTable";
    import { useM2 } from "../../hooks/useM2";
    import Sidebar from "./../../components/m2-care-context/LinkedPatients/Sidebar";
    import { Menu } from "lucide-react";
import { useUnit } from "../../context/UnitContext";

    const LinkedPatientsPage = () => {
      const [search, setSearch] = useState("");
      const [fromDate, setFromDate] = useState("");
      const [toDate, setToDate] = useState("");
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [collapsed, setCollapsed] = useState(false);
      const {selectedUnit} = useUnit();

      const { searchPatients, searchPatientsByDateRange } = useM2();
      const [patients, setPatients] = useState([]);
      const formatDate = (date: string) => {
        return date.replaceAll("-", "");
      };

      const handleSearch = async () => {

        // BOTH SEARCH TYPES FILLED

        if (
          search.trim() &&
          (fromDate || toDate)
        ) {

          alert(
            "Please use either Patient Name / MR No OR Date Range."
          );

          return;
        }

        // NOTHING ENTERED

        if (
          !search.trim() &&
          !fromDate &&
          !toDate
        ) {

          alert(
            "Please enter Patient Name / MR No or select Date Range."
          );

          return;
        }

        // ONLY ONE DATE

        if (
          (fromDate && !toDate) ||
          (!fromDate && toDate)
        ) {

          alert(
            "Please select both From Date and To Date."
          );

          return;
        }

        // NAME / MR SEARCH

        if (search.trim()) {

          const response =
            await searchPatients(search);

          console.log(response);

          if (response) {
            setPatients(response);
          } else {
            setPatients([]);
          }

          return;
        }

        // DATE RANGE SEARCH

        const response =
          await searchPatientsByDateRange(
            selectedUnit,
            formatDate(fromDate),
            formatDate(toDate)
          );

        console.log(response);

        if (response) {
          setPatients(response);
        } else {
          setPatients([]);
        }

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

          {/* MAIN CONTENT */}
  <div className="flex-1 flex flex-col">

            {/* MOBILE HEADER */}
            <div className="lg:hidden sticky top-0 z-30 h-[60px] bg-white border-b border-gray-200 flex items-center px-4">

              <button
                onClick={() => setSidebarOpen(true)}
                className="bg-[#008080] text-white p-2 rounded-lg"
              >
                <Menu size={22} />
              </button>

              <h1 className="flex-1 text-center text-lg font-semibold text-[#1e293b] pr-10">
                Linked Patients
              </h1>

            </div>

            {/* PAGE CONTENT */}
            <div className="flex-1 p-4 lg:p-8 w-full">

              {/* DESKTOP TITLE */}
              <div className="hidden lg:block mb-6">

                <h1 className="text-3xl font-bold text-[#1e293b]">
                  Linked Patients
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  Patients already linked with ABHA
                </p>

              </div>

              {/* CARD */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full ">

                {/* HEADER */}
                <div className="p-4 lg:p-6 border-b border-gray-100">

              <div>

              <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                Linked Patients
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View and manage linked patient records
              </p>
              <SearchBar
                search={search}
                setSearch={setSearch}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                onSearch={handleSearch}
              />

              </div>

                            </div>

                        {/* TABLE */}

              {patients.length > 0 ? (

                <div className="w-full overflow-x-auto">
                  <PatientTable patients={patients} />
                </div>

              ) : (

                <div className="py-16 text-center">

                  <h3 className="text-lg font-semibold text-slate-700">
                    No patients found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try searching with a different value.
                  </p>

                </div>

              )}

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:p-6 border-t border-gray-100">

                <p className="text-sm text-gray-500 text-center sm:text-left">
                Showing {patients.length} of {patients.length} patients
              </p>

                  <div className="flex items-center gap-2 flex-wrap justify-center">

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
                      3
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

    export default LinkedPatientsPage;