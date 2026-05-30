import { useNavigate } from "react-router-dom";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";

import SelectedTypes from "../../components/m3-consent/request-consent/SelectedTypes";

import ConsentForm from "../../components/m3-consent/request-consent/ConsentForm";

import RequestSummary from "../../components/m3-consent/request-consent/RequestSummary";

const RequestConsentPage = () => {
  const navigate = useNavigate();

  return (
    <ConsentLayout currentStep={3}>
      <div className="bg-white border border-[#e5e7eb] rounded-[18px] shadow-sm p-4 sm:p-5 md:p-6 max-w-[980px] w-full overflow-hidden">

        {/* Heading */}
        <h1 className="text-[20px] sm:text-[26px] md:text-[30px] font-bold text-[#111827] leading-tight">
          Request Consent
        </h1>

        <p className="text-[13px] sm:text-[14px] text-[#6b7280] mt-2 leading-relaxed">
          Review and confirm your request.
        </p>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-5">

          {/* Left */}
          <div>
            <SelectedTypes />

            <ConsentForm
              onBack={() =>
                navigate("/m3/select-records")
              }
              onSubmit={() =>
                navigate("/m3/pending-requests")
              }
            />
          </div>

          {/* Right */}
          <RequestSummary />

        </div>
      </div>
    </ConsentLayout>
  );
};

export default RequestConsentPage;