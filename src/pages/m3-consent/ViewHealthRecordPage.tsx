    import { useEffect, useState } from "react";
    import { useLocation } from "react-router-dom";

    import useM3 from "../../hooks/useM3";
    import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
    import mockBundle from "../../mock/mockBundle";
    import PatientDetails from "../../components/m3-consent/view-health-record/PatientDetails";
    import HealthRecordTabs from "../../components/m3-consent/view-health-record/HealthRecordTabs";

    const ViewHealthRecordPage = () => {
      const location = useLocation();

      const healthInfoTransactionId =
        location.state?.healthInfoTransactionId;

      const { viewHealthRecord } = useM3();

      const [record, setRecord] = useState<any>(null);

      const [loading, setLoading] = useState(true);
      const [bundle, setBundle] = useState<any>(null);
      const [patient, setPatient] = useState<any>(null);

    const [prescriptions, setPrescriptions] = useState<any[]>([]);

    const [diagnosticReports, setDiagnosticReports] = useState<any[]>([]);

    const [observations, setObservations] = useState<any[]>([]);

    const [encounters, setEncounters] = useState<any[]>([]);

    const [documents, setDocuments] = useState<any[]>([]);




      useEffect(() => {
        const loadHealthRecord = async () => {
          if (!healthInfoTransactionId) return;

          const response = await viewHealthRecord(
            healthInfoTransactionId
          );

          console.log("Health Record Response", response);
        console.log(response.data.bundleJson);

          setRecord(response.data);
          const parsedBundle = mockBundle;


        console.log(parsedBundle);

        setBundle(parsedBundle);
        const entries = parsedBundle.entry || [];

    setPatient(
      entries.find(
        (item: any) =>
          item.resource?.resourceType === "Patient"
      )?.resource || null
    );

    setPrescriptions(
      entries
        .filter(
          (item: any) =>
            item.resource?.resourceType === "MedicationRequest"
        )
        .map((item: any) => item.resource)
    );

    setDiagnosticReports(
      entries
        .filter(
          (item: any) =>
            item.resource?.resourceType === "DiagnosticReport"
        )
        .map((item: any) => item.resource)
    );

    setObservations(
      entries
        .filter(
          (item: any) =>
            item.resource?.resourceType === "Observation"
        )
        .map((item: any) => item.resource)
    );

    setEncounters(
      entries
        .filter(
          (item: any) =>
            item.resource?.resourceType === "Encounter"
        )
        .map((item: any) => item.resource)
    );

    setDocuments(
      entries
        .filter(
          (item: any) =>
            item.resource?.resourceType === "DocumentReference"
        )
        .map((item: any) => item.resource)
    );


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
                <PatientDetails patient={patient} />
                <HealthRecordTabs
              prescriptions={prescriptions}
              diagnosticReports={diagnosticReports}
              observations={observations}
              encounters={encounters}
              documents={documents}
            />
            </div>
            
          </div>
        </ConsentLayout>
      );
    };

    export default ViewHealthRecordPage;