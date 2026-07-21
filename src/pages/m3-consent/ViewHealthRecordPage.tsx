    import { useEffect, useState } from "react";
    import { useLocation } from "react-router-dom";

    import useM3 from "../../hooks/useM3";
    import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import { parseFhirBundle } from "../../utils/fhirParser";
import ResourceRenderer from "../../components/m3-consent/resource-renderer/ResourceRenderer";

    const ViewHealthRecordPage = () => {
      const location = useLocation();

      const healthInfoTransactionId =
        location.state?.healthInfoTransactionId;

      const { viewHealthRecord } = useM3();


      const [loading, setLoading] = useState(true);

     const [resources, setResources] =useState<Record<string, any[]>>({});




      useEffect(() => {
        const loadHealthRecord = async () => {
          if (!healthInfoTransactionId) return;

          const response = await viewHealthRecord(
            healthInfoTransactionId
          );

          console.log("Health Record Response", response);
        console.log(response.data.bundleJson);
        console.log(typeof response.data.bundleJson);

        const parsedBundle = JSON.parse(response.data.bundleJson);


        console.log(parsedBundle);


        const parsedResources =
          parseFhirBundle(parsedBundle);

        setResources(parsedResources);



            setLoading(false);
        };

        loadHealthRecord();
      }, [healthInfoTransactionId]);

      if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <ConsentLayout>
          <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h1 className="text-2xl font-bold text-slate-800">
              Health Record
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View health information received from HIP.
            </p>

            <div className="mt-6 rounded-lg bg-slate-100 p-4 overflow-auto">
              <ResourceRenderer resources={resources} />
            </div>
            
          </div>
        </ConsentLayout>
      );
    };

    export default ViewHealthRecordPage;