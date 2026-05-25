import {
  GenerateLinkTokenService,
LinkCareContextService,
SendSMSService,
GetWorkflowStatusService,
NotifyCareContextService,
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

    return {
    generateLinkToken,
    linkCareContext,
    notifyCareContext,
    sendSMS,
    getWorkflowStatus,
    };
};