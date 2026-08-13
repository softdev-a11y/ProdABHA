import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useM3 from "../../hooks/useM3";
import { LoaderContext } from "../../context/LoaderProvider";
import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import ConsentForm from "../../components/m3-consent/request-consent/ConsentForm";
import toast from "react-hot-toast";

const getErrorMessage = (response: any) => {
  if (!response) return "Failed to submit consent request.";

  if (typeof response === "string") return response;

  if (response?.message && typeof response.message === "string") {
    return response.message;
  }

  const firstError = response?.errors
    ? Object.values(response.errors)[0]
    : null;

  if (Array.isArray(firstError) && firstError.length > 0) {
    return String(firstError[0]);
  }

  return "Failed to submit consent request.";
};

const RequestConsentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

const patient = location.state?.patient;
const { submitConsentRequest } = useM3();
const { setLoading: setGlobalLoading }: any = useContext(LoaderContext);

const handleSubmit = async (payload: any) => {
    try {
    setGlobalLoading(true);
  const response = await submitConsentRequest(payload);

  if (response?.success) {
    toast.success(response.message || "Consent request submitted successfully.");
    navigate("/m3/request-list");
  } else {
    toast.error(getErrorMessage(response));
  }
  } catch (error) {
    console.log(error);
    toast.error("Failed to submit consent request.");
  } finally {
    setGlobalLoading(false);
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