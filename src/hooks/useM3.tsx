import {
  SearchPatientsService,
  GetConsentRequestListService,
  GetConsentDetailsService,
  GetRequestDataService,
  SubmitConsentRequestService,
  ViewHealthRecordService,
} from "../services/m3Service";

const useM3 = () => {

  const searchPatients = async (searchText: string) => {
    try {
      const response = await SearchPatientsService(searchText);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

const getConsentRequestList = async (
  unitCode: string
) => {
  try {
    const response = await GetConsentRequestListService(
      unitCode
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getConsentDetails = async (requestId: string) => {
    try {
      const response = await GetConsentDetailsService(requestId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestData = async (consentId: string) => {
    try {
      const response = await GetRequestDataService(consentId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const viewHealthRecord = async (
  healthInfoTransactionId: string
) => {
  try {
    const response = await ViewHealthRecordService(
      healthInfoTransactionId
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

  const submitConsentRequest = async (payload: any) => {
  try {
    const response =
      await SubmitConsentRequestService(payload);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

return {
  searchPatients,
  getConsentRequestList,
  getConsentDetails,
  getRequestData,
  submitConsentRequest,
  viewHealthRecord,
};
};

export default useM3;