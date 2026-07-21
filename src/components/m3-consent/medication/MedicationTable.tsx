import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  medications: any[];
}

const MedicationTable = ({ medications }: Props) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "medicine",
        header: "Medicine",
        cell: ({ row }) =>
          row.original.medicationCodeableConcept?.text ??
          row.original.medicationCodeableConcept?.coding?.[0]?.display ??
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
        id: "dosage",
        header: "Dosage",
        cell: ({ row }) =>
          row.original.dosageInstruction?.[0]?.text ?? "-",
      },
      {
        id: "authoredOn",
        header: "Prescribed On",
        cell: ({ row }) =>
          row.original.authoredOn ?? "-",
      },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Medications
      </h2>

      <TanStackTable
        data={medications}
        columns={columns}
      />
    </div>
  );
};

export default MedicationTable;