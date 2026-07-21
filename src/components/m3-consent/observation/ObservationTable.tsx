import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  observations: any[];
}

const ObservationTable = ({ observations }: Props) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "observation",
        header: "Observation",
        cell: ({ row }) =>
          row.original.code?.text ??
          row.original.code?.coding?.[0]?.display ??
          "-",
      },
      {
        id: "value",
        header: "Value",
        cell: ({ row }) =>
          row.original.valueQuantity
            ? `${row.original.valueQuantity.value} ${row.original.valueQuantity.unit ?? ""}`
            : row.original.valueString ?? "-",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "effectiveDate",
        header: "Effective Date",
        cell: ({ row }) =>
          row.original.effectiveDateTime ?? "-",
      },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Observations
      </h2>

      <TanStackTable
        data={observations}
        columns={columns}
      />
    </div>
  );
};

export default ObservationTable;