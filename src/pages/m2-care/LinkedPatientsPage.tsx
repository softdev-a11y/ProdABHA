    import { useState } from "react";
    import SearchBar from "../../components/m2-care-context/LinkedPatients/SearchBar";
    import PatientTable from "../../components/m2-care-context/LinkedPatients/PatientTable";
    import { useM2 } from "../../hooks/useM2";
    import Sidebar from "./../../components/m2-care-context/LinkedPatients/Sidebar";
    import { Menu } from "lucide-react";
    import toast from "react-hot-toast";
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

          toast.error(
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

          toast.error(
            "Please enter Patient Name / MR No or select Date Range."
          );

          return;
        }

        // ONLY ONE DATE

        if (
          (fromDate && !toDate) ||
          (!fromDate && toDate)
        ) {

          toast.error(
            "Please select both From Date and To Date."
          );

          return;
        }

        // MINIMUM 3 CHARACTERS

        if (search.trim() && search.trim().length < 3) {
          toast.error("Please enter at least 3 characters.");
          return;
        }

        // INVALID DATE RANGE

        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
          toast.error("From Date cannot be later than To Date.");
          return;
        }

        // NAME / MR SEARCH

        if (search.trim()) {

          const response =
            await searchPatients(search,selectedUnit);

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
  <div className="flex-1 min-w-0 flex flex-col pt-16 lg:pt-0">

            {/* MOBILE HEADER */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">

              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded hover:bg-slate-100"
              >
                <Menu size={22} />
              </button>

              <h1 className="font-semibold text-slate-800">
                Linked Patients
              </h1>

              <div className="w-9 h-9" />

            </div>

            {/* PAGE CONTENT */}
            <div className="flex-1 w-full px-4 pt-4 pb-4">


              {/* CARD */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full">

                {/* HEADER */}
                <div className="p-5 border-b border-gray-100">

              <div>

             
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

                  <h3 className="text-base font-semibold text-gray-700">
                    No patients found
                  </h3>

                  <p className="mt-3 text-sm text-gray-500">
                    Try searching with a different value.
                  </p>

                </div>

              )}

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-gray-100">

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