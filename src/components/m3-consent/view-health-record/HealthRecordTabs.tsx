import { useState } from "react";
import PrescriptionTab from "./PrescriptionTab";
import DiagnosticReportTab from "./DiagnosticReportTab";
import ObservationTab from "./ObservationTab";
import EncounterTab from "./EncounterTab";
import DocumentsTab from "./DocumentsTab";

interface Props {
  prescriptions: any[];
  diagnosticReports: any[];
  observations: any[];
  encounters: any[];
  documents: any[];
}

const HealthRecordTabs = ({
  prescriptions,
  diagnosticReports,
  observations,
  encounters,
  documents,
}: Props) => {
  const [activeTab, setActiveTab] = useState("Prescription");

  const tabs = [
    "Prescription",
    "Diagnostic Reports",
    "OP Consultation",
    "Observation",
    "Documents",
  ];

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>

        {activeTab === "Prescription" && (
          <PrescriptionTab data={prescriptions} />
        )}

        {activeTab === "Diagnostic Reports" && (
          <DiagnosticReportTab data={diagnosticReports} />
        )}

        {activeTab === "OP Consultation" && (
          <EncounterTab data={encounters} />
        )}

        {activeTab === "Observation" && (
          <ObservationTab data={observations} />
        )}

        {activeTab === "Documents" && (
          <DocumentsTab data={documents} />
        )}

      </div>
    </div>
  );
};

export default HealthRecordTabs;