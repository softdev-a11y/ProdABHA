import m2ApiClient from "./m2ApiClient";


// GENERATE LINK TOKEN

export const GenerateLinkTokenService = (
    data:any
) => {

    return m2ApiClient.post(
        "/api/v1/hip/link-token-generation",
        data
    );
};


// WORKFLOW STATUS

export const GetWorkflowStatusService = (
    transactionId:string
) => {

    return m2ApiClient.get(
        `/api/v1/hip/workflow-status/${transactionId}`
    );
};


// LINK CARE CONTEXT

export const LinkCareContextService = (
    data:any
) => {

    return m2ApiClient.post(
        "/api/v1/hip/link-care-context",
        data
    );
};


// NOTIFY CARE CONTEXT

export const NotifyCareContextService = (
    data:any
) => {

    return m2ApiClient.post(
        "/api/v1/hip/notify-care-context",
        data
    );
};


// SEND SMS

export const SendSMSService = (
    data:any
) => {

    return m2ApiClient.post(
        "/api/v1/hip/sms-notification",
        data
    );
};