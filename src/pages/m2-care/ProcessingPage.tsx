import { useEffect, useState } from "react";
import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
import { Menu, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const processingSteps = [
  "Generating link token",
  "Link token received",
  "Linking care contexts",
  "Finalizing",
];

const ProcessingPage = () => {
    const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [collapsed, setCollapsed] = useState(false);

  const [currentStep, setCurrentStep] =
    useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentStep((prev) => {

        if (prev < processingSteps.length) {
          return prev + 1;
        }

        clearInterval(interval);
        navigate("/success");
        return prev;

      });

    }, 2000);

    return () => clearInterval(interval);

  }, []);

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
            Processing
          </h1>

        </div>

        {/* CONTENT */}
        <div className="p-4 lg:p-8">

          {/* DESKTOP TITLE */}
          <div className="hidden lg:block mb-6">

            <h1 className="text-3xl font-bold text-[#1e293b]">
              Processing Link Request
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Linking selected care contexts to ABHA
            </p>

          </div>

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8 max-w-3xl mx-auto">

            {/* LOADER */}
            <div className="flex flex-col items-center">

              <div className="w-20 h-20 rounded-full border-4 border-[#008080] border-t-transparent animate-spin mb-6" />

              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Linking records to ABHA...
              </h2>

              <p className="text-gray-500 text-sm mt-2 text-center">
                Please wait, this may take a few moments.
              </p>

            </div>

            {/* STEPS */}
            <div className="mt-10 space-y-5">

              {processingSteps.map((step, index) => {

                const completed =
                  index < currentStep;

                const loading =
                  index === currentStep;

                return (
                  <div
                    key={step}
                    className="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4"
                  >

                    <div className="flex items-center gap-4">

                      {/* ICON */}
                      <div>

                        {completed ? (

                          <CheckCircle2
                            className="text-green-600"
                            size={24}
                          />

                        ) : loading ? (

                          <Loader2
                            className="animate-spin text-[#008080]"
                            size={24}
                          />

                        ) : (

                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />

                        )}

                      </div>

                      {/* TEXT */}
                      <span className="font-medium text-gray-700">
                        {step}
                      </span>

                    </div>

                    {/* STATUS */}
                    <div>

                      {completed && (
                        <span className="text-green-600 text-sm font-medium">
                          Completed
                        </span>
                      )}

                      {loading && (
                        <span className="text-[#008080] text-sm font-medium">
                          Processing...
                        </span>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

            {/* WARNING */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">

              <p className="text-sm text-blue-700 text-center font-medium">
                Please do not close this window or refresh the page.
              </p>

            </div>

          </div>

      

        </div>

      </div>
    </div>
  );
};

export default ProcessingPage;