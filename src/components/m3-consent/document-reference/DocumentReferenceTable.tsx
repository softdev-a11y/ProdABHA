import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import TanStackTable from "../shared/TanStackTable";

interface Props {
  documents: any[];
}

const isPdfContentType = (contentType?: string) =>
  (contentType ?? "").toLowerCase().includes("application/pdf");

const decodeBase64ToBlobUrl = (
  base64Data: string,
  contentType: string
) => {
  const normalized = base64Data.replace(/\s/g, "");

  if (!normalized) {
    throw new Error("Missing Base64 data");
  }

  // Basic validation to avoid attempting to decode non-Base64 payloads.
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!base64Regex.test(normalized)) {
    throw new Error("Invalid Base64 format");
  }

  const binaryString = window.atob(normalized);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: contentType });
  return URL.createObjectURL(blob);
};

const DocumentReferenceTable = ({ documents }: Props) => {
  const handleViewAttachment = (attachment: any) => {
    const contentType = attachment?.contentType ?? "";
    const data = attachment?.data;
    const url = attachment?.url;

    try {
      if (isPdfContentType(contentType) && data) {
        const blobUrl = decodeBase64ToBlobUrl(
          data,
          "application/pdf"
        );
        window.open(blobUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }
    } catch (error) {
      console.error("Unable to open attachment", error);
      window.alert("Unable to open this document.");
      return;
    }

    window.alert("No supported document data found.");
  };

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
      {
        id: "attachments",
        header: "Attachments",
        cell: ({ row }) => {
          const content = row.original.content;

          if (!Array.isArray(content) || content.length === 0) {
            return "No attachment";
          }

          const attachmentItems = content
            .map((entry: any, index: number) => ({
              attachment: entry?.attachment,
              index,
            }))
            .filter(
              (item: any) => item.attachment && typeof item.attachment === "object"
            );

          if (attachmentItems.length === 0) {
            return "No attachment";
          }

          return (
            <div className="flex flex-col gap-2">
              {attachmentItems.map((item: any) => {
                const attachment = item.attachment;
                const contentType = attachment?.contentType ?? "";
                const title =
                  attachment?.title ??
                  `Attachment ${item.index + 1}`;
                const hasData = Boolean(attachment?.data);
                const hasUrl = Boolean(attachment?.url);
                const isPdf = isPdfContentType(contentType);

                let actionLabel = "Unsupported";
                let disabled = true;

                if (isPdf && hasData) {
                  actionLabel = "View PDF";
                  disabled = false;
                } else if (hasUrl) {
                  actionLabel = "View Document";
                  disabled = false;
                } else if (isPdf && !hasData) {
                  actionLabel = "PDF data missing";
                }

                return (
                  <div
                    key={`${row.id}-${item.index}`}
                    className="flex items-center gap-2"
                  >
                    <span className="max-w-[220px] truncate text-sm text-slate-700">
                      {title}
                    </span>

                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => handleViewAttachment(attachment)}
                      className="rounded-md bg-teal-600 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLabel}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        },
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