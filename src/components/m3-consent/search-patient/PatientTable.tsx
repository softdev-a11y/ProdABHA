import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Patient {
  mrno: string;
  patName: string;
  patFName: string;
  patLName: string;
  abhaNumber: string;
}

interface PatientTableProps {
  data: Patient[];
  loading: boolean;
}

const PatientTable = ({
  data,
  loading,
}: PatientTableProps) => {
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<Patient>[]>(
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
        accessorKey: "patFName",
        header: "First Name",
      },
      {
        accessorKey: "patLName",
        header: "Last Name",
      },
      {
        accessorKey: "abhaNumber",
        header: "ABHA ID",
      },
      {
        id: "action",
        header: "Action",
    cell: ({ row }) => (
  <button
    onClick={() =>
      navigate("/m3/request-consent", {
        state: {
          patient: row.original,
        },
      })
    }
    className="rounded-md bg-teal-600 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-700"
  >
    Request
  </button>
)
      },
    ],
    [navigate]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Search Results
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Matching patients will be displayed below.
        </p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500">
          Loading...
        </div>
      ) : (
        <TanStackTable
          data={data}
          columns={columns}
        />
      )}

    </div>
  );
};

export default PatientTable;