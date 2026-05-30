import { useNavigate } from "react-router-dom";

interface Props {
  currentStep: number;
}

const directAccess = [
  {
    id: 4,
    title: "Pending Requests",
    subtitle: "Waiting for approval",
    path: "/m3/pending-requests",
  },
  {
    id: 5,
    title: "View Records",
    subtitle: "Fetch & View Data",
    path: "/m3/view-records",
  },
];

const requestFlow = [
  {
    id: 1,
    title: "Search Patient",
    subtitle: "Search using ABHA address",
  },
  {
    id: 2,
    title: "Select Records",
    subtitle: "Choose HI Types",
  },
  {
    id: 3,
    title: "Request Consent",
    subtitle: "Provide details",
  },
];

const ConsentSidebar = ({
  currentStep,
}: Props) => {
  const navigate = useNavigate();

  const showRequestFlow =
    currentStep === 1 ||
    currentStep === 2 ||
    currentStep === 3;

  return (
    <div className="w-[240px] h-screen bg-[#f8fafc] border-r border-[#e5e7eb] flex flex-col">

      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-[22px] font-bold leading-none text-[#111827]">
          ABDM M3
        </h1>

        <p className="mt-2 text-[12px] text-[#6b7280] leading-relaxed">
          Health Information Exchange
        </p>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 px-5 overflow-y-auto">

        {/* Direct Access */}
        <div className="flex flex-col gap-5">

          {directAccess.map((step) => {
            const active =
              currentStep === step.id;

            return (
              <button
                key={step.id}
                onClick={() =>
                  navigate(step.path)
                }
                className={`w-full text-left flex items-start gap-3 rounded-[12px] px-3 py-3 transition-all ${
                  active
                    ? "bg-[#eff6ff]"
                    : "hover:bg-[#f1f5f9]"
                }`}
              >
                {/* Dot */}
                <div
                  className={`w-[10px] h-[10px] rounded-full mt-[7px] shrink-0 ${
                    active
                      ? "bg-[#2563eb]"
                      : "bg-[#d1d5db]"
                  }`}
                />

                {/* Text */}
                <div>
                  <h3
                    className={`text-[15px] font-semibold leading-tight ${
                      active
                        ? "text-[#111827]"
                        : "text-[#374151]"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-1 text-[11px] text-[#9ca3af] leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}

        </div>

        {/* Request Consent Expand */}
        <div className="mt-8">

          <button
            onClick={() =>
              navigate("/m3/search-patient")
            }
            className={`w-full text-left rounded-[12px] px-3 py-3 ${
              showRequestFlow
                ? "bg-[#eff6ff]"
                : "hover:bg-[#f1f5f9]"
            }`}
          >
            <h2
              className={`text-[15px] font-semibold ${
                showRequestFlow
                  ? "text-[#111827]"
                  : "text-[#374151]"
              }`}
            >
              Request Consent
            </h2>

            <p className="mt-1 text-[11px] text-[#9ca3af]">
              Create new consent request
            </p>
          </button>

          {/* Expanded Steps */}
          {showRequestFlow && (
            <div className="mt-5 ml-2 flex flex-col gap-6">

              {requestFlow.map((step) => {
                const active =
                  currentStep === step.id;

                const completed =
                  currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className="flex items-start gap-3"
                  >
                    {/* Circle */}
                    <div
                      className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 transition-all ${
                        active
                          ? "bg-[#2563eb] text-white shadow-sm"
                          : completed
                          ? "bg-[#16a34a] text-white"
                          : "bg-white border border-[#d1d5db] text-[#9ca3af]"
                      }`}
                    >
                      {step.id}
                    </div>

                    {/* Text */}
                    <div className="pt-[1px]">
                      <h3
                        className={`text-[14px] font-semibold leading-tight ${
                          active
                            ? "text-[#111827]"
                            : "text-[#374151]"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-1 text-[11px] text-[#9ca3af] leading-relaxed">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ConsentSidebar;