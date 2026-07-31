import m3ApiClient from "./m3ApiClient";

export const SearchPatientsService = (
  searchText: string,
  unitCode: string
) => {
  return m3ApiClient.get(
    `/api/HiuInternal/search-patients?searchText=${searchText}&unitCode=${unitCode}`
  );
};

export const SearchPatientsByDateRangeService = (
  unitCode: string,
  startDate: string,
  endDate: string
) => {
  return m3ApiClient.get(
    `/api/HiuInternal/search-patients-by-date-range?unitCode=${unitCode}&startDate=${startDate}&endDate=${endDate}`
  );
};

export const GetConsentRequestListService = (
  unitCode: string,
  startDate: string,
  endDate: string
) => {
  return m3ApiClient.get(
    `/api/HiuInternal/consent-requests-list?unitCode=${unitCode}&startDate=${startDate}&endDate=${endDate}`
  );
};

export const GetConsentDetailsService = (requestId: string) => {
  return m3ApiClient.get(
    `/api/HiuInternal/consent-requests/${requestId}`
  );
};

export const GetRequestDataService = (consentId: string) => {
  return m3ApiClient.get(
    `/api/HiuInternal/consent-requests-list/${consentId}`
  );
};

export const SubmitConsentRequestService = (payload: any) => {
  return m3ApiClient.post(
    "/api/hiecm/consent/v3/request/init",
    payload
  );
};

export const RequestHealthInformationService = (payload: any) => {
  return m3ApiClient.post(
    "/api/hiecm/data-flow/v3/health-information/request",
    payload
  );
};

export const ViewHealthRecordService = (
  healthInfoTransactionId: string
) => {
  return m3ApiClient.get(
    `/api/HiuInternal/view-data/${healthInfoTransactionId}`
  );
};