import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../context/LoaderProvider";
import { useLocation, useNavigate } from "react-router-dom";

import useM3 from "../../hooks/useM3";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import PatientInfo from "../../components/m3-consent/view-records/PatientInfo";
import SummaryCards from "../../components/m3-consent/view-records/SummaryCards";
import HealthRecordsTable from "../../components/m3-consent/view-records/HealthRecordsTable";

const ViewDataPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const consentId = location.state?.consentId;

  const consent = location.state?.consent;

  const { getRequestData } = useM3();
 const { setLoading: setGlobalLoading }: any = useContext(LoaderContext);

  const [records, setRecords] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
        try {
      if (!consentId) return;
       setGlobalLoading(true);

      const response = await getRequestData(consentId);

      console.log("Health Records Response", response);
      console.log("Records", response.data);
      console.log(records);

      setRecords(response.data);
      
  } catch (error) {

    console.log(error);
    setRecords([]);

  } finally {

    setLoading(false);
    setGlobalLoading(false);

  }

    };

    loadRecords();

    console.log("Records after load consent", consent);
  }, [consentId]);

  const handleView = (healthInfoTransactionId: string) => {
    navigate("/m3/view-health-record", {
      state: {
        healthInfoTransactionId,
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && records.length === 0) {
    return (
      <ConsentLayout>
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            No Health Records Available
          </h2>

          <p className="mt-3 text-slate-500">
            Health records will be available once the patient grants consent and
            the data is received from the HIP.
          </p>

          <button
            onClick={() => navigate("/m3/request-list")}
            className="mt-8 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Back to Consent Requests
          </button>
        </div>
      </ConsentLayout>
    );
  }
  return (
    <ConsentLayout>
      <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">View Data</h1>

          <p className="mt-1 text-sm text-slate-500">
            View decrypted health records received from HIP.
          </p>
        </div>

        <div className="mt-6">
          <PatientInfo consent={consent} />
        </div>

        <div className="mt-6">
          <SummaryCards consent={consent} />
        </div>

        <div className="mt-6">
          <HealthRecordsTable records={records} onView={handleView} />
        </div>
      </div>
    </ConsentLayout>
  );
};

export default ViewDataPage;
