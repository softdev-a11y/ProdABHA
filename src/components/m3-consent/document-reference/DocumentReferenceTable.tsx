import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  documents: any[];
}

const DocumentReferenceTable = ({ documents }: Props) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "document",
        header: "Document",
        cell: ({ row }) =>
          row.original.description ??
          row.original.type?.text ??
          row.original.type?.coding?.[0]?.display ??
          "-",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "category",
        header: "Category",
        cell: ({ row }) =>
          row.original.category?.[0]?.coding?.[0]?.display ??
          "-",
      },
      {
        accessorKey: "date",
        header: "Document Date",
      },
      {
        id: "author",
        header: "Author",
        cell: ({ row }) =>
          row.original.author?.[0]?.display ?? "-",
      },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Documents
      </h2>

      <TanStackTable
        data={documents}
        columns={columns}
      />
    </div>
  );
};

export default DocumentReferenceTable;