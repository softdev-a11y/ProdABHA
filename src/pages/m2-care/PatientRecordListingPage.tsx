    import { useState } from "react";
    import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
    import { Menu, ArrowLeft } from "lucide-react";
    import { useNavigate } from "react-router-dom";
import ConfirmLinkModal from "../../components/m2-care-context/ConfirmationModal/ConfirmLinkModal";
    const records = [
    {
        id: 1,
        title: "Prescription",
        count: 2,
        color: "text-purple-600",
        selected: true,
    },
    {
        id: 2,
        title: "Lab Reports",
        count: 3,
        color: "text-green-600",
        selected: true,
    },
    {
        id: 3,
        title: "OP Consultation",
        count: 5,
        color: "text-orange-500",
        selected: true,
    },
    {
        id: 4,
        title: "Discharge Summary",
        count: 1,
        color: "text-red-500",
        selected: false,
    },
    {
        id: 5,
        title: "Radiology",
        count: 2,
        color: "text-blue-600",
        selected: true,
    },
    ];

    const PatientRecordListingPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [openModal, setOpenModal] = useState(false);
        const navigate = useNavigate();


    const [selectedRecords, setSelectedRecords] =
        useState(records);

    const toggleSelection = (id: number) => {
        setSelectedRecords((prev) =>
        prev.map((record) =>
            record.id === id
            ? {
                ...record,
                selected: !record.selected,
                }
            : record
        )
        );
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

                    <h2 className="text-xl font-semibold text-gray-800">
                    Ravi Kumar (UH12345)
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                    ABHA: 91-9999-8888-7777 |
                    ravi@abdm
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

                {/* RECORD LIST */}
                <div className="space-y-3">

                    {selectedRecords.map((record) => (

                    <div
                        key={record.id}
                    className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#008080] transition"
                    >

                        {/* LEFT */}
                        <div className="flex items-center gap-4">

                        <input
                            type="checkbox"
                            checked={record.selected}
                            onChange={() =>
                            toggleSelection(record.id)
                            }
                            className="w-5 h-5 accent-[#008080]"
                        />

                        <div>

                            <h4
                            className={`font-semibold ${record.color}`}
                            >
                            {record.title}
                            </h4>

                            <p className="text-sm text-gray-500">
                            {record.count} record(s)
                            available
                            </p>

                        </div>

                        </div>

                    </div>

                    ))}

                </div>

                </div>

                {/* FOOTER BUTTONS */}
                <div className="flex flex-col lg:flex-row items-center justify-end gap-3 mt-6">

                <button className="w-full lg:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                    Cancel
                </button>

                <button
                  onClick={() => setOpenModal(true)}
                 className="w-full lg:w-auto px-6 py-2.5 rounded-lg bg-[#008080] hover:bg-[#006d6d] text-white transition">
                    Link Records
                </button>

                </div>

            </div>

            </div>

        </div>
        <ConfirmLinkModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  onConfirm={() => {
    setOpenModal(false);
    navigate("/processing");
  }}
/>
        </div>
    );
    };

    export default PatientRecordListingPage;