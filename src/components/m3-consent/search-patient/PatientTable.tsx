    import { useMemo } from "react";
    import { useNavigate } from "react-router-dom";
    import type { ColumnDef } from "@tanstack/react-table";
    import TanStackTable from "../shared/TanStackTable";

    interface Patient {
    name: string;
    mrNo: string;
    firstName: string;
    lastName: string;
    abhaId: string;
    }

    const PatientTable = () => {
    const navigate = useNavigate();

    const data: Patient[] = [
        {
        name: "Ravi Kumar",
        mrNo: "MRN001234",
        firstName: "Ravi",
        lastName: "Kumar",
        abhaId: "91-9999-8888-7777",
        },
        {
        name: "Sita Devi",
        mrNo: "MRN001235",
        firstName: "Sita",
        lastName: "Devi",
        abhaId: "91-8888-7777-6666",
        },
        {
        name: "Mohammed Ali",
        mrNo: "MRN001236",
        firstName: "Mohammed",
        lastName: "Ali",
        abhaId: "91-7777-6666-5555",
        },
        {
        name: "Anita Sharma",
        mrNo: "MRN001237",
        firstName: "Anita",
        lastName: "Sharma",
        abhaId: "91-6666-5555-4444",
        },
        {
        name: "Rajesh Verma",
        mrNo: "MRN001238",
        firstName: "Rajesh",
        lastName: "Verma",
        abhaId: "91-5555-4444-3333",
        },
    ];

    const columns = useMemo<ColumnDef<Patient>[]>(
        () => [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "mrNo",
            header: "MR No",
        },
        {
            accessorKey: "firstName",
            header: "First Name",
        },
        {
            accessorKey: "lastName",
            header: "Last Name",
        },
        {
            accessorKey: "abhaId",
            header: "ABHA ID",
        },
        {
            id: "action",
            header: "Action",
            cell: () => (
            <button
                onClick={() => navigate("/m3/request-consent")}
                className="rounded-md bg-teal-600 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-700"
            >
                Request
            </button>
            ),
        },
        ],
        [navigate]
    );

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">

        <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Search Results
            </h2>

            <p className="mt-1 text-sm text-slate-500">
            Matching patients will be displayed below.
            </p>
        </div>

        <TanStackTable
            data={data}
            columns={columns}
        />

        </div>
    );
    };

    export default PatientTable;