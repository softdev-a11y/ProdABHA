import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  encounters: any[];
}

const EncounterCard = ({ encounters }: Props) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Visit No",
      },
        {
        id: "visitDate",
        header: "Visit Date",
        cell: ({ row }) => {
          const date = row.original.period?.start;

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
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "visitType",
        header: "Visit Type",
        cell: ({ row }) => row.original.class?.display ?? "-",
      },
      {
        id: "doctor",
        header: "Doctor",
        cell: ({ row }) =>
          row.original.participant?.[0]?.individual?.display ?? "-",
      },
      {
        id: "hospital",
        header: "Hospital",
        cell: ({ row }) =>
          row.original.serviceProvider?.display ?? "-",
      },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Encounter History
      </h2>

      <TanStackTable
        data={encounters}
        columns={columns}
      />
    </div>
  );
};

export default EncounterCard;