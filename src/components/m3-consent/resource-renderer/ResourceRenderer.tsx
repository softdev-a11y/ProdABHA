import PatientCard from "../patient/PatientCard";
import EncounterCard from "../encounter/EncounterCard";
import PractitionerCard from "../practitioner/PractitionerCard";
import CompositionCard from "../composition/CompositionCard";
import ConditionTable from "../condition/ConditionTable";
import InvestigationTable from "../investigation/InvestigationTable";
import OrganizationCard from "../organization/OrganizationCard";
import ObservationTable from "../observation/ObservationTable";
import MedicationTable from "../medication/MedicationTable";
import DiagnosticReportTable from "../diagnostic-report/DiagnosticReportTable";
import DocumentReferenceTable from "../document-reference/DocumentReferenceTable";

interface Props {
  resources: Record<string, any[]>;
}

const ResourceRenderer = ({ resources }: Props) => {
  return (
    <div className="space-y-6">
      
      {resources.Patient?.length > 0 && (
        <PatientCard patient={resources.Patient[0]} />
      )}

      {resources.Encounter?.length > 0 && (
        <EncounterCard encounters={resources.Encounter} />
      )}

      {resources.Practitioner?.length > 0 && (
        <PractitionerCard practitioners={resources.Practitioner} />
      )}
      {resources.Condition?.length > 0 && (
        <ConditionTable conditions={resources.Condition} />
      )}
      {resources.ServiceRequest?.length > 0 && (
        <InvestigationTable investigations={resources.ServiceRequest} />
      )}
      {resources.Organization?.length > 0 && (
        <OrganizationCard organizations={resources.Organization} />
      )}
      {resources.Observation?.length > 0 && (
        <ObservationTable observations={resources.Observation} />
      )}
      {resources.MedicationRequest?.length > 0 && (
        <MedicationTable medications={resources.MedicationRequest} />
      )}
      {resources.DiagnosticReport?.length > 0 && (
        <DiagnosticReportTable diagnosticReports={resources.DiagnosticReport} />
      )}
      
      {resources.Composition?.length > 0 && (
        <CompositionCard
          compositions={resources.Composition}
          resources={resources}
        />
      )}

      {resources.DocumentReference?.length > 0 && (
        <DocumentReferenceTable documents={resources.DocumentReference} />
      )}
    </div>
  );
};

export default ResourceRenderer;
