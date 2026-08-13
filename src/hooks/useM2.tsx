import {
  GenerateLinkTokenService,
LinkCareContextService,
SendSMSService,
GetWorkflowStatusService,
NotifyCareContextService,
GetCareContextsService,
  SearchPatientService,
   SearchPatientByDateRangeService,
  GetLinkedHistoryService,
  GetLinkedHistoryByDateRangeService,
  GetUserInitiatedTransactionsByDateRangeService,
   CreateCounterService,
  GetCountersService
} from "../services/m2.service";

export const useM2 = () => {


    const generateLinkToken =
    async (payload:any) => {

        try{

            const response =
            await GenerateLinkTokenService(
                payload
            );

            return response.data;

        }catch(error){

            console.log(error);
        }
    };


    const linkCareContext =
    async (payload:any) => {

        try{

            const response =
            await LinkCareContextService(
                payload
            );

            return response.data;

        }catch(error){

            console.log(error);
        }
    };

const notifyCareContext =
async (payload:any) => {

    try{

        const response =
        await NotifyCareContextService(
            payload
        );

        return response.data;

    }catch(error){

        console.log(error);
    }
};
    const sendSMS =
    async (payload:any) => {

        try{

            const response =
            await SendSMSService(
                payload
            );

            return response.data;

        }catch(error){

            console.log(error);
        }
    };

    const getWorkflowStatus =
async (transactionId:string) => {

    try{

        const response =
        await GetWorkflowStatusService(
            transactionId
        );

        return response.data;

    }catch(error){

        console.log(error);
    }
};

const getCareContexts = async (
  unitCode: string,
  mrNo: string
) => {
  try {
    const response = await GetCareContextsService(
      unitCode,
      mrNo
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const searchPatients = async (
  searchText: string,
  unitCode: string
) => {
  try {
    const response = await SearchPatientService(
      searchText,
      unitCode
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const searchPatientsByDateRange = async (
  unitCode: string,
  startDate: string,
  endDate: string
) => {

  try {

    const response =
      await SearchPatientByDateRangeService(
        unitCode,
        startDate,
        endDate
      );

    return response.data;

  } catch (error) {

    console.log(error);

  }

};

const getLinkedHistory = async (
  abhaAddress: string,
  unitCode: string
) => {

  try {

    const response =
      await GetLinkedHistoryService(
        abhaAddress,
        unitCode
      );

    return response.data;

  } catch (error) {

    console.log(error);

  }

};

const getLinkedHistoryByDateRange = async (
  unitCode: string,
  startDate: string,
  endDate: string
) => {

  try {

    const response =
      await GetLinkedHistoryByDateRangeService(
        unitCode,
        startDate,
        endDate
      );

    return response.data;

  } catch (error) {

    console.log(error);

  }

};
const getUserInitiatedTransactionsByDateRange = async (
  fromDate: string,
  toDate: string
) => {
  try {

    const response =
      await GetUserInitiatedTransactionsByDateRangeService(
        fromDate,
        toDate
      );

    return response.data;

  } catch (error) {

    console.log(error);

  }
};

const createCounter = async (
  counterCode: string,
  counterName: string,
  unitCode: string
) => {
  try {
    
    const response =
      await CreateCounterService({
        counterCode,
        counterName,
        unitCode
      });

    return response.data;

  } catch (error) {

    console.log(error);

  }
};


const getCounters = async (unitCode: string) => {
  try {

    const response =
      await GetCountersService(unitCode);

    return response.data;

  } catch (error) {

    console.log(error);

  }
};
    return {
    generateLinkToken,
    linkCareContext,
    notifyCareContext,
    getCareContexts,
    searchPatients,
    sendSMS,
    getWorkflowStatus,
    searchPatientsByDateRange,
    getLinkedHistory,
    getLinkedHistoryByDateRange,
    getUserInitiatedTransactionsByDateRange,
    createCounter,
    getCounters
    };
};