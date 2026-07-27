  import { useNavigate } from "react-router-dom";

  import {
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";

  import type { ColumnDef } from "@tanstack/react-table";
interface Patient {
  patientId: string;
  uhid: string;
  mrno: string;
  patName: string;
  patFName: string;
  patLName: string;
  unitCode: string;
  abhaNumber: string;
  abhaAddress: string;
  patSex: string;
  patMobile?: string;
}

  interface Props {
    patients: Patient[];
  }

  const PatientTable = ({ patients }: Props) => {
    const navigate = useNavigate();

    const columns: ColumnDef<Patient>[] = [
      {
        accessorKey: "patName",
        header: "Patient Name",
      },
   
      {
        accessorKey: "mrno",
        header: "MR No",
      },
      {
        accessorKey: "abhaNumber",
        header: "ABHA Number",
      },
      {
        accessorKey: "abhaAddress",
        header: "ABHA Address",
      },
      // {
      //   accessorKey: "ipno",
      //   header: "IP No",
      // },
      {
        accessorKey: "patSex",
        header: "Gender",
      },
      {
        accessorKey: "patMobile",
        header: "Mobile Number",
        cell: ({ row }) => row.original.patMobile || "-",
      },
   
      {
            id: "action",
        header: "Action",
        cell: ({row}) => (
        <button
      onClick={() =>
        navigate("/patientrecords", {
          state: row.original,
        })
      }
         className="bg-[#008080] hover:bg-[#006d6d] text-white px-2 py-1 rounded text-xs font-medium transition"
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
  <div className="w-full max-w-full overflow-x-auto">

  <table className="min-w-[1050px] w-full border-collapse">

      <thead className="bg-[#f8fafc]">

        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>

            {headerGroup.headers.map((header) => (
  <th
  key={header.id}
    className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap ${
    header.id === "action" ? "text-center" : ""
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
  className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
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