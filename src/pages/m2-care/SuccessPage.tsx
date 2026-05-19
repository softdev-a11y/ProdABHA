import { useState } from "react";
import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
import {
  Menu,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);
const [collapsed, setCollapsed] = useState(false);
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
            Success
          </h1>

        </div>

        {/* CONTENT */}
        <div className="p-4 lg:p-8">

          {/* DESKTOP TITLE */}
          <div className="hidden lg:block mb-6">

            <h1 className="text-3xl font-bold text-[#1e293b]">
              Records Linked Successfully
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Care contexts successfully linked to ABHA
            </p>

          </div>

          {/* SUCCESS CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8 max-w-3xl mx-auto">

            {/* SUCCESS ICON */}
            <div className="flex flex-col items-center text-center">

              <CheckCircle2
                size={90}
                className="text-green-600 mb-5"
              />

              <h2 className="text-3xl font-bold text-gray-800">
                Records Linked Successfully!
              </h2>

              <p className="text-gray-500 mt-2">
                Care contexts have been linked to ABHA.
              </p>

            </div>

            {/* SUMMARY CARD */}
            <div className="mt-10 border border-gray-200 rounded-2xl p-6">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="space-y-5 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Patient Name
                    </span>

                    <span className="font-medium text-right">
                      Ravi Kumar
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      UHID
                    </span>

                    <span className="font-medium text-right">
                      UH12345
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      ABHA Number
                    </span>

                    <span className="font-medium text-right">
                      91-9999-8888-7777
                    </span>
                  </div>

                </div>

                <div className="space-y-5 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Total Records Linked
                    </span>

                    <span className="font-semibold text-[#008080]">
                      12
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Linked On
                    </span>

                    <span className="font-medium text-right">
                      30 May 2024, 05:21 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Status
                    </span>

                    <span className="text-green-600 font-semibold">
                      Success
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-4">

              <button
                onClick={() =>
                  navigate("/linkedhistory")
                }
                className="w-full lg:w-auto px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                View Linked History
              </button>

              <button
                onClick={() =>
                  navigate("/linkedpatients")
                }
                className="w-full lg:w-auto px-6 py-3 rounded-xl bg-[#008080] hover:bg-[#006d6d] text-white transition"
              >
                Back to Patients
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SuccessPage;