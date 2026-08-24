import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Encounter {
  id?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  class?: {
    system?: string;
    code?: string;
    display?: string;
  };
  type?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  subject?: {
    reference?: string;
    display?: string;
  };
  participant?: Array<{
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    }>;
    individual?: {
      reference?: string;
      display?: string;
    };
  }>;
  serviceProvider?: {
    reference?: string;
    display?: string;
  };
  period?: {
    start?: string;
    end?: string;
  };
}

interface Props {
  encounters: Encounter[];
}

const EncounterCard = ({ encounters }: Props) => {
  const columns = useMemo<ColumnDef<Encounter>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Visit No",
        cell: ({ row }) => row.original.id?.trim() || "-",
      },
      {
        id: "visitDate",
        header: "Visit Date",
        cell: ({ row }) => {
          const date = row.original.period?.start;

          if (!date) {
            return "-";
          }

          const parsedDate = new Date(date);

          if (Number.isNaN(parsedDate.getTime())) {
            return "-";
          }

          return parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => row.original.status ?? "-",
      },
      {
        id: "visitType",
        header: "Visit Type",
        cell: ({ row }) =>
          row.original.class?.display ??
          row.original.class?.code ??
          "-",
      },
      {
        id: "encounterType",
        header: "Encounter Type",
        cell: ({ row }) => {
          const type = row.original.type?.[0];

          return (
            type?.text ??
            type?.coding?.[0]?.display ??
            type?.coding?.[0]?.code ??
            "-"
          );
        },
      },
      {
        id: "doctor",
        header: "Doctor",
        cell: ({ row }) =>
          row.original.participant?.[0]?.individual?.display?.trim() ?? "-",
      },
      {
        id: "hospital",
        header: "Hospital",
        cell: ({ row }) =>
          row.original.serviceProvider?.display?.trim() ?? "-",
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