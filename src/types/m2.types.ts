export interface IGenerateLinkTokenPayload {

    abhaAddress:string;

    abhaNumber:number;

    name:string;

    gender:string;

    yearOfBirth:number;
}



export interface ILinkCareContextPayload {

    abhaAddress:string;

    linkToken:string;

    patient:{
        referenceNumber:string;

        display:string;

        careContexts:{
            referenceNumber:string;

            display:string;
        }[];

        hiType:string;

        count:number;
    };
}



export interface ISendSMSPayload {

    requestId:string;

    timestamp:string;

    abhaAddress:string;

    notification:{
        phoneNo:string;

        hip:{
            id:string;

            name:string;
        };
    };
}