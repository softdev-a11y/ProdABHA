export interface SearchPatientRequest {
  abhaAddress: string;
}

export interface PatientDetails {
  abhaAddress: string;
  patientReference: string;
  discoveredOn: string;
}

export type ParsedFhirResources = Record<
  string,
  any[]
>;