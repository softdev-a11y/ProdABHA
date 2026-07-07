  import { useNavigate } from "react-router-dom";
  import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";

  const ConsentDetailsPage = () => {
    const navigate = useNavigate();

    return (
      <ConsentLayout>
        <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">

          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Consent Details
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View complete consent request details.
            </p>
          </div>

          {/* Patient Details */}
          <div className="mt-8">

            <h2 className="mb-4 text-xl font-semibold text-center sm:text-left">
              Patient Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center xl:justify-items-stretch">

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  Patient Name
                </p>

                <p className="mt-1 font-semibold break-words">
                  Ravi Kumar
                </p>
              </div>

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  MR No
                </p>

                <p className="mt-1 font-semibold break-all">
                  MRN001234
                </p>
              </div>

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  ABHA ID
                </p>

                <p className="mt-1 font-semibold break-all">
                  91-9999-8888-7777
                </p>
              </div>

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  ABHA Address
                </p>

                <p className="mt-1 font-semibold break-all">
                  ravi@abdm
                </p>
              </div>

            </div>

          </div>

          {/* Consent Details */}
          <div className="mt-10">

            <h2 className="mb-4 text-xl font-semibold text-center sm:text-left">
              Consent Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center xl:justify-items-stretch">

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  Purpose
                </p>

                <p className="mt-1 font-semibold break-words">
                  Care Management
                </p>
              </div>

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  HI Types
                </p>

                <p className="mt-1 font-semibold break-words">
                  Prescription, Diagnostic
                </p>
              </div>

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  Status
                </p>

                <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Granted
                </span>
              </div>

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  Consent Created
                </p>

                <p className="mt-1 font-semibold">
                  07 Jul 2026
                </p>
              </div>

              <div className="w-full max-w-[260px] text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  Consent Granted
                </p>

                <p className="mt-1 font-semibold">
                  07 Jul 2026
                </p>
              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col-reverse sm:flex-row justify-center sm:justify-end gap-3">

            <button
              onClick={() => navigate("/m3/request-list")}
              className="w-full sm:w-auto rounded-lg border border-slate-300 px-6 py-3"
            >
              Back
            </button>

            <button
              className="w-full sm:w-auto rounded-lg bg-teal-600 px-6 py-3 text-white hover:bg-teal-700"
            >
              View Data
            </button>

          </div>

        </div>
      </ConsentLayout>
    );
  };

  export default ConsentDetailsPage;