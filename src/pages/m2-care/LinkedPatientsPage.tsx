  import { useState } from "react";
  import SearchBar from "../../components/m2-care-context/LinkedPatients/SearchBar";
  import PatientTable from "../../components/m2-care-context/LinkedPatients/PatientTable";
  import { Patients } from "../../components/m2-care-context/LinkedPatients/Patients";
  import Sidebar from "./../../components/m2-care-context/LinkedPatients/Sidebar";
  import { Menu } from "lucide-react";

  const LinkedPatientsPage = () => {
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const filteredPatients = Patients.filter((patient) =>
      `${patient.name} ${patient.uhid} ${patient.abhaNumber}`
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

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  <div>
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                      Linked Patients
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      View and manage linked patient records
                    </p>
                  </div>

                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                  />

                </div>

              </div>

              {/* TABLE */}
              <div className="w-full overflow-x-auto">
                <PatientTable patients={filteredPatients} />
              </div>

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:p-6 border-t border-gray-100">

                <p className="text-sm text-gray-500 text-center sm:text-left">
                  Showing 1 to 5 of 120 patients
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