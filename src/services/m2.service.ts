import apiClient from "./apiClient";


// GENERATE LINK TOKEN

export const GenerateLinkTokenService = (
    data:any
) => {

    return apiClient.post(
        "/api/v1/hip/link-token-generation",
        data
    );
};


// WORKFLOW STATUS

export const GetWorkflowStatusService = (
    transactionId:string
) => {

    return apiClient.get(
        `/api/v1/hip/workflow-status/${transactionId}`
    );
};


// LINK CARE CONTEXT

export const LinkCareContextService = (
    data:any
) => {

    return apiClient.post(
        "/api/v1/hip/link-care-context",
        data
    );
};


// NOTIFY CARE CONTEXT

export const NotifyCareContextService = (
    data:any
) => {

    return apiClient.post(
        "/api/v1/hip/notify-care-context",
        data
    );
};


// SEND SMS

export const SendSMSService = (
    data:any
) => {

    return apiClient.post(
        "/api/v1/hip/sms-notification",
        data
    );
};