      import { useEffect, useState } from "react";
        import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
        import { Menu, ArrowLeft } from "lucide-react";
        import { useNavigate } from "react-router-dom";
    import ConfirmLinkModal from "../../components/m2-care-context/ConfirmationModal/ConfirmLinkModal";
    import { useM2 } from "../../hooks/useM2";
    import { useLocation } from "react-router-dom";
      



        const PatientRecordListingPage = () => {
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [collapsed, setCollapsed] = useState(false);
        const [openModal, setOpenModal] = useState(false);
        const [hiTypes, setHiTypes] = useState<any[]>([]);
        const location = useLocation();

        const patientData = location.state as any;
        // const [, setTransactionId] = useState("");
        const [workflowStatus, setWorkflowStatus] =useState("");
         const navigate = useNavigate();
         const { generateLinkToken, getWorkflowStatus, getCareContexts,  linkCareContext,} = useM2();


         const [selectedCareContexts, setSelectedCareContexts] = useState<string[]>([]);
         const [expandedSection, setExpandedSection] = useState<string | null>(null);

            const toggleSelection = (recordId: string) => {
            setSelectedCareContexts((prev) =>
                prev.includes(recordId)
                ? prev.filter((id) => id !== recordId)
                : [...prev, recordId]
            );
            };

            useEffect(() => {
            loadCareContexts();
            }, []);

            const loadCareContexts = async () => {
            const response = await getCareContexts(
            patientData.unitCode,
            patientData.mrno
            );

            console.log(response);

            if (response?.success) {
                setHiTypes(response.data.careContextGroups);
            }
            };
                    const handleConfirmLinking = async () => {

                try {

                    // SELECTED RECORDS

            console.log("PATIENT DATA", patientData);

            const tokenPayload = {

            unitCode: patientData?.unitCode,

            abhaAddress: patientData?.abhaAddress,

            abhaNumber: patientData?.abhaNumber,

            name: patientData?.patName,

            gender: patientData?.patSex,

            yearOfBirth: Number(patientData?.dateOfBirth?.substring(0, 4)),
            };
            
            const patientPayload = [
            {
                referenceNumber: patientData?.mrno,
                display: patientData?.patName,
                hiType: "Prescription",
                count: selectedCareContexts.length,

                careContexts: hiTypes
                .flatMap((section: any) => section.records)
                .filter((record: any) =>
                    selectedCareContexts.includes(record.referenceNumber)
                )
                .map((record: any) => ({
                    referenceNumber: record.referenceNumber,
                    display: record.display,
                })),
            },
            ];

            console.log(
            "TOKEN PAYLOAD",
            tokenPayload
            );


            // GENERATE TOKEN API

            const tokenResponse =
            await generateLinkToken(
                tokenPayload
            );


            console.log(
            "TOKEN RESPONSE",
            tokenResponse
            );



            const txnId =
            tokenResponse?.data?.transactionId;

            console.log(
                "TRANSACTION ID",
                txnId
            );

            // setTransactionId(txnId);


            if(!txnId){

                alert(
                    "Transaction ID not received"
                );

                return;
            }


            // WORKFLOW STATUS CHECK

            let retryCount = 0;

            const interval = setInterval(
            async () => {

                retryCount++;

                const workflowResponse =
                await getWorkflowStatus(
                    txnId
                );

                console.log(
                    "WORKFLOW RESPONSE",
                    workflowResponse
                );

                const tokenReceived =
                workflowResponse?.data?.linkTokenReceived;

                const workflowMessage =
                workflowResponse?.data?.message;

                if(workflowMessage){

                    setWorkflowStatus(
                        workflowMessage
                    );
                }

            if(tokenReceived){

                clearInterval(interval);

                const linkToken =
                workflowResponse?.data?.linkToken;

                const linkPayload = {
                    abhaNumber: patientData?.abhaNumber,
                    abhaAddress: patientData?.abhaAddress,
                    linkToken,
                    patient: patientPayload,
                    transactionId: txnId,
                    };

                    console.log("LINK PAYLOAD", linkPayload);

                   localStorage.setItem(
                        "transactionId",
                        txnId
                    );

                    localStorage.setItem(
                        "linkToken",
                        linkToken
                    );

                    localStorage.setItem(
                        "linkPayload",
                        JSON.stringify(linkPayload)
                    );
                    localStorage.setItem(
                        "patientData",
                        JSON.stringify(patientData)
                    );

                    setWorkflowStatus(
                        "SUCCESS"
                    );

                    setOpenModal(false);

                    navigate("/processing");
                                }

                if(retryCount >= 10){

                    clearInterval(interval);

                    setWorkflowStatus(
                        "Callback Timeout"
                    );
                }

            }, 5000);

                
                } catch (error) {

                    console.log(error);
                }
            };




        return (
        <div className="bg-[#f5f7fb] min-h-screen flex">

            {/* SIDEBAR */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* PAGE CONTENT */}
    <div className="flex-1 flex flex-col">

                {/* MOBILE TOPBAR */}
                <div className="lg:hidden h-[60px] bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-30">

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="bg-[#008080] text-white p-2 rounded-lg"
                >
                    <Menu size={22} />
                </button>

                <h1 className="flex-1 text-center text-lg font-semibold text-[#1e293b] pr-10">
                    Patient Records
                </h1>

                </div>

                {/* PAGE */}
                <div className="p-4 lg:p-8">

                {/* DESKTOP TITLE */}
                <div className="hidden lg:block mb-6">

                    <h1 className="text-3xl font-bold text-[#1e293b]">
                    Patient Record Listing
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                    Show all available records of selected patient
                    </p>

                </div>

                {/* MAIN CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 lg:p-5">

                    {/* TOP */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

                    {/* BACK */}
                    <button
                        onClick={() => navigate("/linkedpatients")}
                        className="flex items-center gap-2 text-[#008080] font-medium text-sm"
                    >
                        <ArrowLeft size={18} />
                        Back to Patients
                    </button>

                    {/* PATIENT INFO */}
                    <div className="text-left lg:text-center">
                    <h2>
                    {patientData?.patName} ({patientData?.mrno})
                    </h2>

                                        <p>
                    ABHA: {patientData?.abhaNumber} | {patientData?.abhaAddress}
                    </p>

                    </div>

                    <div className="hidden lg:block w-[120px]" />

                    </div>

                    {/* AVAILABLE RECORDS */}
                    <div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Available Records
                    </h3>

                    <p className="text-sm text-gray-500 mb-3">
                        Select the records you want to link to ABHA
                    </p>

               <div className="space-y-4">

                    {hiTypes.map((section) => (

                        <div
                    key={section.hiType}
                        className="border border-gray-200 rounded-xl"
                        >

                        <button
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 font-semibold text-[#008080]"
                    onClick={() =>
                        setExpandedSection(
                        expandedSection === section.hiType
                            ? null
                            : section.hiType
                        )
                    }
                    >
                    <span>{section.hiType}</span>

                    <span>
                        {expandedSection === section.hiType ? "−" : "+"}
                    </span>
                    </button>

                    {expandedSection === section.hiType && (

                    <div className="p-4 space-y-2">

                            {section.records.map((record: any) => (

                            <label
                            key={record.referenceNumber}
                                className="flex items-center gap-3"
                            >

                                <input
                                type="checkbox"
                                checked={selectedCareContexts.includes(record.referenceNumber)}
                                onChange={() => toggleSelection(record.referenceNumber)}
                                className="w-4 h-4 accent-[#008080]"
                                />

                            <div>
                    <p className="font-medium">
                        {record.display}
                    </p>

                    <p className="text-xs text-gray-500">
                        {record.description}
                    </p>
                    </div>

                            </label>

                            ))}

                        </div>


                    )}
                        </div>

                    ))}

                    </div>

                    </div>

                    {/* FOOTER BUTTONS */}
                    <div className="flex flex-col lg:flex-row items-center justify-end gap-3 mt-6">

                    <button
                        onClick={() => navigate("/linkedpatients")}
                    className="w-full lg:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                        Cancel
                    </button>

                    <button
                    onClick={() => setOpenModal(true)}
                  className={`px-6 py-2 rounded-lg text-white transition
                    ${
                    selectedCareContexts.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                    }`}
                    >
                        Link Records
                    </button>

                    </div>

                </div>

                </div>

            </div>
            <ConfirmLinkModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onConfirm={handleConfirmLinking}
                patient={patientData}
                hiTypes={hiTypes}
                selectedCareContexts={selectedCareContexts}
                />
            </div>
        );
        };

        export default PatientRecordListingPage;