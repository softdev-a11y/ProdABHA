import m2ApiClient from "./m2ApiClient";


// GENERATE LINK TOKEN

export const GenerateLinkTokenService = (
    data:any
) => {

    return m2ApiClient.post(
       "/api/v3/hip/link-token-generation",
        data
    );
};


// WORKFLOW STATUS

export const GetWorkflowStatusService = (
    transactionId:string
) => {

    return m2ApiClient.get(
      `/api/v3/hip/workflow-status/${transactionId}`
    );
};


// LINK CARE CONTEXT

export const LinkCareContextService = (
    data:any
) => {

    return m2ApiClient.post(
        "/api/v3/hip/link-care-context",
        data
    );
};


// NOTIFY CARE CONTEXT

export const NotifyCareContextService = (
    data:any
) => {

    return m2ApiClient.post(
        "/api/v3/hip/notify-care-context",
        data
    );
};


// SEND SMS

export const SendSMSService = (
    data:any
) => {

    return m2ApiClient.post(
        "/api/v3/hip/sms-notification",
        data
    );
};


// GET CARE CONTEXTS

export const GetCareContextsService = (
  unitCode: string,
  mrNo: string
) => {
  return m2ApiClient.get(
    `/api/hip/internal/care-contexts/${unitCode}/${mrNo}`
  );
};

// SEARCH PATIENT

export const SearchPatientService = (
  searchText: string,
  unitCode: string
) => {
  return m2ApiClient.get(
    `/api/HipInternal/search-patients?searchText=${searchText}&unitCode=${unitCode}`
  );
};

// SEARCH PATIENT BY DATE RANGE

export const SearchPatientByDateRangeService = (
  unitCode: string,
  startDate: string,
  endDate: string
) => {

  return m2ApiClient.get(
    `/api/HipInternal/search-patients-by-date-range?unitCode=${unitCode}&startDate=${startDate}&endDate=${endDate}`
  );

};
 
 // LINKED HISTORY
export const GetLinkedHistoryService = (
  abhaAddress: string,
  unitCode: string
) => {

  return m2ApiClient.get(
    `/api/HipInternal/linked-care-context-history?abhaAddress=${abhaAddress}&unitCode=${unitCode}`
  );

};


// LINKED HISTORY DATE RANGE
export const GetLinkedHistoryByDateRangeService = (
  unitCode: string,
  startDate: string,
  endDate: string
) => {

  return m2ApiClient.get(
    `/api/HipInternal/linked-care-context-history/by-date-range?unitCode=${unitCode}&startDate=${startDate}&endDate=${endDate}`
  );

};

// USER INITIATED TRANSACTIONS BY DATE RANGE

export const GetUserInitiatedTransactionsByDateRangeService = (
  fromDate: string,
  toDate: string
) => {

  return m2ApiClient.get(
    `/api/HipInternal/user-initiated-transactions/by-date-range?fromDate=${fromDate}&toDate=${toDate}`
  );

};

// CREATE COUNTER

export const CreateCounterService = (
  data: {
    counterCode: string;
    counterName: string;
    unitCode: string;
  }
) => {

  return m2ApiClient.post(
    "/api/abdm/counter",
    data
  );

};


// GET ALL COUNTERS

export const GetCountersService = (unitCode: string) => {

  return m2ApiClient.get(
    `/api/abdm/counter?unitCode=${encodeURIComponent(unitCode)}`
  );

};