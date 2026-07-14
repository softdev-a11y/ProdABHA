    import { useMemo } from "react";
    import { useNavigate } from "react-router-dom";
    import type { ColumnDef } from "@tanstack/react-table";
    import TanStackTable from "../shared/TanStackTable";

    interface RequestItem {
    name: string;
    abhaId: string;
    status: "Pending" | "Granted";
    consentCreatedOn: string;
    consentGrantedOn: string;
    }

    const RequestTable = () => {
    const navigate = useNavigate();

    const data: RequestItem[] = [
        {
        name: "Ravi Kumar",
        abhaId: "91-9999-8888-7777",
        status: "Pending",
        consentCreatedOn: "07 Jul 2026",
        consentGrantedOn: "-",
        },
        {
        name: "Sita Devi",
        abhaId: "91-8888-7777-6666",
        status: "Granted",
        consentCreatedOn: "06 Jul 2026",
        consentGrantedOn: "06 Jul 2026",
        },
        {
        name: "Mohammed Ali",
        abhaId: "91-7777-6666-5555",
        status: "Pending",
        consentCreatedOn: "05 Jul 2026",
        consentGrantedOn: "-",
        },
        {
        name: "Anita Sharma",
        abhaId: "91-6666-5555-4444",
        status: "Granted",
        consentCreatedOn: "05 Jul 2026",
        consentGrantedOn: "05 Jul 2026",
        },
        {
        name: "Rajesh Verma",
        abhaId: "91-5555-4444-3333",
        status: "Pending",
        consentCreatedOn: "04 Jul 2026",
        consentGrantedOn: "-",
        },
    ];

    const columns = useMemo<ColumnDef<RequestItem>[]>(
        () => [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "abhaId",
            header: "ABHA ID",
        },
        {
            accessorKey: "status",
            header: "Request Status",
            cell: ({ row }) => (
            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                row.original.status === "Granted"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
                {row.original.status}
            </span>
            ),
        },
        {
            accessorKey: "consentCreatedOn",
            header: "Consent Created On",
        },
        {
            accessorKey: "consentGrantedOn",
            header: "Consent Granted On",
        },
        {
            id: "action",
            header: "Action",
            cell: () => (
            <button
                onClick={() => navigate("/m3/consent-details")}
                className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
                View Details
            </button>
            ),
        },
        ],
        [navigate]
    );

    return (
        <TanStackTable
        data={data}
        columns={columns}
        />
    );
    };

    export default RequestTable;