import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useM3 from "../../hooks/useM3";
import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";

const ConsentDetailsPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

const { getConsentDetails } = useM3();

const requestId = location.state?.requestId;

const [consent, setConsent] = useState<any>(null);

const [loading, setLoading] = useState(true);

useEffect(() => {

    const loadConsent = async () => {

        if (!requestId) return;

        const response =
        await getConsentDetails(requestId);

       setConsent(response.data);

        setLoading(false);

    };

    loadConsent();

}, [requestId, ]);

const isGranted = consent?.status === "GRANTED";

if (loading) {
    return <div>Loading...</div>;
}

console.log(consent);

  return (
    <ConsentLayout>
      <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:p-6 shadow-sm">

        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Consent Details
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            View complete consent request details.
          </p>
        </div>

        {/* Patient Details */}
       <div className="mt-6">

          <h2 className="mb-4 text-xl font-semibold text-center sm:text-left">
            Patient Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center xl:justify-items-stretch">

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                Patient Name
              </p>

              <p className="mt-1 font-semibold">
               {consent.patientAbhaAddress}
              </p>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                MR No
              </p>

              <p className="mt-1 font-semibold">
                 -
              </p>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                ABHA ID
              </p>

              <p className="mt-1 text-sm font-medium break-all">
                {consent.patientAbhaAddress}
              </p>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                ABHA Address
              </p>

              <p className="mt-1 font-semibold break-all">
                {consent.patientAbhaAddress}
              </p>
            </div>

          </div>

        </div>

        {/* Consent Details */}
       <div className="mt-7">

          <h2 className="mb-3 text-lg font-semibold text-center sm:text-left">
            Consent Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center xl:justify-items-stretch">

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                Purpose
              </p>

              <p className="mt-1 font-semibold">
              {consent.purposeText}
              </p>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                HI Types
              </p>

          <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
  {consent.hiTypesJson ? (
    JSON.parse(consent.hiTypesJson).map((type: string) => (
      <span
        key={type}
        className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[11px] font-medium text-teal-700"
      >
        {type}
      </span>
    ))
  ) : (
    <span className="text-sm text-slate-500">
      No HI Types Selected
    </span>
  )}
</div>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                From Date
              </p>

              <p className="mt-1 font-semibold">
             {new Date(consent.permissionFromUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                To Date
              </p>

              <p className="mt-1 font-semibold">
              {new Date(consent.permissionToUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                Status
              </p>

              <span className="mt-2 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-medium text-green-700">
            {consent.status}
              </span>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                Consent Created
              </p>

              <p className="mt-1 font-semibold">
             {new Date(consent.createdAtUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="w-full max-w-[260px] text-center sm:text-left">
              <p className="text-xs text-slate-500">
                Data Erase At
              </p>

              <p className="mt-1 text-xs font-medium">
                {new Date(consent.dataEraseAtUtc).toLocaleDateString("en-GB")}
              </p>
            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-7 flex flex-col-reverse sm:flex-row justify-center sm:justify-end gap-2">

          <button
            onClick={() => navigate("/m3/request-list")}
           className="w-full sm:w-auto rounded-lg border border-slate-300 px-5 py-2.5 text-sm hover:bg-slate-50"
          >
            Back
          </button>

          {/* <button
          className="w-full sm:w-auto rounded-lg bg-blue-600 px-5 py-2.5 text-sm text-white hover:bg-blue-700"
          >
            Request Data
          </button> */}

      <button
  disabled={!isGranted}
  onClick={() =>
    navigate("/m3/view-data", {
      state: {
        consentId: consent.consentId,
      },
    })
  }
  className={`w-full sm:w-auto rounded-lg px-5 py-2.5 text-sm text-white ${
    isGranted
      ? "bg-teal-600 hover:bg-teal-700"
      : "bg-slate-300 cursor-not-allowed"
  }`}
>
  View Data
</button>
{!isGranted && (
  <p className="text-xs text-slate-500 mt-2">
    Health records will be available after the patient grants consent.
  </p>
)}

        </div>

      </div>
    </ConsentLayout>
  );
};

export default ConsentDetailsPage;