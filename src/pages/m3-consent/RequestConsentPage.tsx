import { useNavigate } from "react-router-dom";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import ConsentForm from "../../components/m3-consent/request-consent/ConsentForm";

const RequestConsentPage = () => {
  const navigate = useNavigate();

  return (
    <ConsentLayout>
      <div className="w-full max-w-7xl">

        <ConsentForm
          onBack={() => navigate("/m3/search-patient")}
        onSubmit={() => navigate("/m3/request-list")}
        />

      </div>
    </ConsentLayout>
  );
};

export default RequestConsentPage;