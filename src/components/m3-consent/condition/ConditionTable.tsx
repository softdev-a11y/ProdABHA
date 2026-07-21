import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  conditions: any[];
}

const ConditionTable = ({ conditions }: Props) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "condition",
        header: "Condition",
        cell: ({ row }) =>
          row.original.code?.text ??
          row.original.code?.coding?.[0]?.display ??
          "-",
      },
      {
        accessorKey: "clinicalStatus.text",
        header: "Clinical Status",
        cell: ({ row }) =>
          row.original.clinicalStatus?.coding?.[0]?.display ??
          "-",
      },
      {
        accessorKey: "verificationStatus.text",
        header: "Verification",
        cell: ({ row }) =>
          row.original.verificationStatus?.coding?.[0]?.display ??
          "-",
      },
      {
        id: "onset",
        header: "Onset Date",
            cell: ({ row }) => {
        const date = row.original.onsetDateTime;

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
        accessorKey: "recordedDate",
        header: "Recorded Date",
      },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Conditions
      </h2>

      <TanStackTable
        data={conditions}
        columns={columns}
      />
    </div>
  );
};

export default ConditionTable;