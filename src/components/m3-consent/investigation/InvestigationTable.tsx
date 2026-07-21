import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  investigations: any[];
}

const InvestigationTable = ({ investigations }: Props) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "testName",
        header: "Investigation",
        cell: ({ row }) =>
          row.original.code?.text ??
          row.original.code?.coding?.[0]?.display ??
          "-",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "intent",
        header: "Intent",
      },
      {
        id: "authoredOn",
        header: "Requested On",
            cell: ({ row }) => {
        const date = row.original.authoredOn;

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
        },
      },
      {
        id: "requester",
        header: "Requested By",
        cell: ({ row }) =>
          row.original.requester?.display ?? "-",
      },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Investigations
      </h2>

      <TanStackTable
        data={investigations}
        columns={columns}
      />
    </div>
  );
};

export default InvestigationTable;