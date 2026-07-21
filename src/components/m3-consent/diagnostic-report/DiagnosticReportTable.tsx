import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  diagnosticReports: any[];
}

const DiagnosticReportTable = ({
  diagnosticReports,
}: Props) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "report",
        header: "Report",
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
        id: "category",
        header: "Category",
        cell: ({ row }) =>
          row.original.category?.[0]?.coding?.[0]?.display ??
          "-",
      },
      {
        id: "issued",
        header: "Issued Date",
        cell: ({ row }) =>
          row.original.issued ?? "-",
      },
      {
        id: "conclusion",
        header: "Conclusion",
        cell: ({ row }) =>
          row.original.conclusion ?? "-",
      },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Diagnostic Reports
      </h2>

      <TanStackTable
        data={diagnosticReports}
        columns={columns}
      />
    </div>
  );
};

export default DiagnosticReportTable;