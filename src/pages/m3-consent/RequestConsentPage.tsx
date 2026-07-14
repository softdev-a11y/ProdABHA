import { useLocation, useNavigate } from "react-router-dom";
import useM3 from "../../hooks/useM3";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import ConsentForm from "../../components/m3-consent/request-consent/ConsentForm";

const RequestConsentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

const patient = location.state?.patient;
const { submitConsentRequest } = useM3();

const handleSubmit = async (payload: any) => {
  const response = await submitConsentRequest(payload);

  console.log(response);

  if (response?.success) {
    navigate("/m3/request-list");
  }
};

  return (
    <ConsentLayout>
      <div className="w-full max-w-7xl">

<ConsentForm
  patient={patient}
  onBack={() => navigate("/m3/search-patient")}
  onSubmit={handleSubmit}
/>

      </div>
    </ConsentLayout>
  );
};

export default RequestConsentPage;