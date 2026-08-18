import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface HealthRecord {
  id: number;
  consentId: string;
  dataRequestId: string;
  healthInfoTransactionId: string;
  dateRangeFromUtc: string;
  dateRangeToUtc: string;
  requestStatus: string;
  processingStatus?: string; // optional
  errorMessage?: string;
}

interface Props {
  records: any[];
  onView: (healthTransactionId: string) => void;
}

const HealthRecordsTable = ({ records, onView }: Props) => {
  
  const data = records;

  const getStatus = (record: HealthRecord) =>
    (record.processingStatus ?? record.requestStatus ?? "").toUpperCase();

  const columns = useMemo<ColumnDef<HealthRecord>[]>(
    () => [
      {
        accessorKey: "requestStatus",
        header: "Status",
        cell: ({ row }) => (
          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
            {row.original.requestStatus}
          </span>
        ),
      },
      {
        accessorKey: "dateRangeFromUtc",
        header: "From Date",
        cell: ({ row }) =>
          new Date(row.original.dateRangeFromUtc).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      },
      {
        accessorKey: "dateRangeToUtc",
        header: "To Date",
        cell: ({ row }) =>
          new Date(row.original.dateRangeToUtc).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      },
      {
        accessorKey: "processingStatus",
        header: "Processing",
        cell: ({ row }) => row.original.processingStatus ?? "-",
      },
      {
        id: "errorMessage",
        header: "Message",
        cell: ({ row }) => {
          const status = getStatus(row.original);
          if (status !== "FAILED") {
            return "-";
          }

          return row.original.errorMessage ?? "-";
        },
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          const status = getStatus(row.original);

          if (status !== "COMPLETED") {
            return "-";
          }

          return (
            <button
              onClick={() => onView(row.original.healthInfoTransactionId)}
              className="rounded-md bg-teal-600 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-700"
            >
              View
            </button>
          );
        },
      },
    ],
    [onView],
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-800">
        Health Records
      </h2>

      <TanStackTable data={data} columns={columns} />
    </div>
  );
};

export default HealthRecordsTable;
