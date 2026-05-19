  import { useNavigate } from "react-router-dom";

  import {
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";

  import type { ColumnDef } from "@tanstack/react-table";

  interface Patient {
    id: number;
    name: string;
    uhid: string;
    abhaNumber: string;
    abhaAddress: string;
    status: string;
  }

  interface Props {
    patients: Patient[];
  }

  const PatientTable = ({ patients }: Props) => {
    const navigate = useNavigate();

    const columns: ColumnDef<Patient>[] = [
      {
        accessorKey: "name",
        header: "Patient Name",
      },
      {
        accessorKey: "uhid",
        header: "UHID",
      },
      {
        accessorKey: "abhaNumber",
        header: "ABHA Number",
      },
      {
        accessorKey: "abhaAddress",
        header: "ABHA Address",
      },
      {
        accessorKey: "status",
        header: "Link Status",
        cell: ({ row }) => (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            {row.original.status}
          </span>
        ),
      },
      {
            id: "action",
        header: "Action",
        cell: () => (
  <button
    onClick={() =>
      navigate("/patientrecords")
    }
    className="bg-[#008080] hover:bg-[#006d6d] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
  >
    Manage Records
  </button>
        ),
      },
    ];

    const table = useReactTable({
      data: patients,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
  <div className="w-full overflow-x-auto">

    <table className="min-w-[1000px] w-full border-collapse">

      <thead className="bg-[#f8fafc]">

        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>

            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
              className={`px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap ${
    header.id === "action" ? "lg:pl-14" : ""
  }`}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}

          </tr>
        ))}

      </thead>

      <tbody>

        {table.getRowModel().rows.map((row) => (

          <tr
            key={row.id}
            className="border-t border-gray-100 hover:bg-gray-50 transition"
          >

            {row.getVisibleCells().map((cell) => (

              <td
                key={cell.id}
                className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap"
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>

            ))}

          </tr>

        ))}

      </tbody>

    </table>

  </div>
    );
  };

  export default PatientTable;