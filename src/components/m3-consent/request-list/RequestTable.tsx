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
}

interface RequestTableProps {
  data: RequestItem[];
  loading: boolean;
}

const RequestTable = ({
  data,
  loading,
}: RequestTableProps) => {
  const navigate = useNavigate();

  const formatDate = (date: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ARTEFACT_FETCHED":
        return "bg-green-100 text-green-700";

      case "GRANTED":
        return "bg-green-100 text-green-700";

      case "REQUESTED":
        return "bg-yellow-100 text-yellow-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "DENIED":
        return "bg-red-100 text-red-700";

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
        header: "ABHA ID",
      },
      {
        accessorKey: "status",
        header: "Request Status",
        cell: ({ row }) => (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
              row.original.status
            )}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        accessorKey: "createdAtUtc",
        header: "Consent Created On",
        cell: ({ row }) =>
          formatDate(row.original.createdAtUtc),
      },
      {
        accessorKey: "approvedAtUtc",
        header: "Consent Granted On",
        cell: ({ row }) =>
          formatDate(row.original.approvedAtUtc),
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <button
            onClick={() =>
              navigate("/m3/consent-details", {
              state: {
  requestId: row.original.requestId,
}
              })
            }
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            View Details
          </button>
        ),
      },
    ],
    [navigate]
  );

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <TanStackTable
      data={data}
      columns={columns}
    />
  );
};

export default RequestTable;