import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface RequestItem {
  id: number;
  requestId: string;
  consentId: string;
  patientAbhaAddress: string;
  patName: string;
  mrno: string;
  status: string;
  createdAtUtc: string;
  approvedAtUtc: string;
  rejectedAtUtc: string | null;
  dataEraseAtUtc: string | null;
}

interface RequestTableProps {
  data: RequestItem[];
  loading: boolean;
}

const RequestTable = ({ data, loading }: RequestTableProps) => {
  const navigate = useNavigate();

  const formatDate = (date: string | null) => {
    if (!date) return "-";

    return new Date(`${date}Z`).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateExpiry = (date: string | null) => {
    if (!date) return "-";

    return new Date(`${date}Z`).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isConsentExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    debugger;
    return new Date(`${expiryDate}Z`) <= new Date();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ARTEFACT_FETCHED":
      case "GRANTED":
        return "bg-green-100 text-green-700";

      case "REQUESTED":
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "DENIED":
        return "bg-red-100 text-red-700";

      case "REVOKED":
        return "bg-gray-100 text-gray-700";

      case "EXPIRED":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const columns = useMemo<ColumnDef<RequestItem>[]>(
    () => [
      {
        accessorKey: "patName",
        header: "Name",
      },
      {
        accessorKey: "mrno",
        header: "MR No",
      },
      {
        accessorKey: "patientAbhaAddress",
        header: "ABHA Address",
      },
      {
        accessorKey: "status",
        header: "Request Status",
        cell: ({ row }) => {
          const expired = isConsentExpired(row.original.dataEraseAtUtc);
          const displayStatus = expired ? "EXPIRED" : row.original.status;

          return (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                displayStatus,
              )}`}
            >
              {displayStatus}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAtUtc",
        header: "Consent Created On",
        cell: ({ row }) => formatDate(row.original.createdAtUtc),
      },
      {
        accessorKey: "approvedAtUtc",
        header: "Consent Granted On",
        cell: ({ row }) => formatDate(row.original.approvedAtUtc),
      },
      {
        accessorKey: "rejectedAtUtc",
        header: "Revoked On",
        cell: ({ row }) => formatDate(row.original.rejectedAtUtc),
      },
      {
        accessorKey: "dataEraseAtUtc",
        header: "Consent Expired On",
        cell: ({ row }) => formatDateExpiry(row.original.dataEraseAtUtc),
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          const isRevoked = row.original.status === "REVOKED";
          const isExpired = isConsentExpired(row.original.dataEraseAtUtc);

          const isDisabled = isRevoked || isExpired;

          return (
            <button
              disabled={isDisabled}
              onClick={() =>
                navigate("/m3/consent-details", {
                  state: {
                    requestId: row.original.requestId,
                  },
                })
              }
              className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                isDisabled
                  ? "cursor-not-allowed bg-slate-300"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              View Details
            </button>
          );
        },
      },
    ],
    [navigate],
  );

  if (loading) {
    return <div className="py-10 text-center text-slate-500">Loading...</div>;
  }

  return <TanStackTable data={data} columns={columns} />;
};

export default RequestTable;