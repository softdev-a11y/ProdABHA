import { useState } from "react";
import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
import {
  Menu,
  CheckCircle2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const SuccessPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);
const [collapsed, setCollapsed] = useState(false);

  const successData = (location.state as any) || null;

const linkedDateTime = successData?.linkedAt
  ? formatDate(successData.linkedAt)
  : "--";

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
  <div className="flex-1 flex flex-col pt-16 lg:pt-0">

        {/* MOBILE TOPBAR */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold text-slate-800">
            Success
          </h1>

          <div className="w-9 h-9" />

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
                Care Context Linked Successfully
              </h2>

              <p className="text-gray-500 mt-2">
                Care contexts have been linked and notification has been sent.
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
                      {successData?.patientName || "--"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      ABHA Number
                    </span>

                    <span className="font-medium text-right">
                      {successData?.abhaNumber || "--"}
                    </span>
                  </div>

                </div>

                <div className="space-y-5 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Total Records Linked
                    </span>

                    <span className="font-semibold text-[#008080]">
                      {successData?.linkedCareContextCount ?? 0}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Date & Time
                    </span>

                    <span className="font-medium text-right">
                      {linkedDateTime}
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
                  navigate("/dashboard")
                }
                className="w-full lg:w-auto px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Done
              </button>

              <button
                onClick={() =>
                  navigate("/linkedpatients")
                }
                className="w-full lg:w-auto px-6 py-3 rounded-xl bg-[#008080] hover:bg-[#006d6d] text-white transition"
              >
                Back to Search Patient
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SuccessPage;