import { useMemo } from "react";
import { formatDateToLocalTime } from "../../../utils/formatDate";

interface Props {
  compositions: any[];
  resources: Record<string, any[]>;
}

const stripHtml = (value?: string) => {
  if (!value) return "-";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || "-";
};

const getReferenceLabel = (reference?: string) => {
  if (!reference) return "-";
  const parts = reference.split("/");
  if (parts.length < 2) return reference;
  return `${parts[0]} (${parts[1]})`;
};

const getResourceSummary = (resource: any) => {
  if (!resource?.resourceType) {
    return "-";
  }

  switch (resource.resourceType) {
    case "Patient":
      return resource.name?.[0]?.text ?? resource.id ?? "Patient";
    case "Encounter":
      return resource.serviceType?.text ?? resource.class?.display ?? resource.id ?? "Encounter";
    case "Practitioner":
      return resource.name?.[0]?.text ?? resource.id ?? "Practitioner";
    case "Condition":
      return resource.code?.text ?? resource.code?.coding?.[0]?.display ?? resource.id ?? "Condition";
    case "Observation":
      return resource.code?.text ?? resource.code?.coding?.[0]?.display ?? resource.id ?? "Observation";
    case "DiagnosticReport":
      return resource.code?.text ?? resource.code?.coding?.[0]?.display ?? resource.id ?? "DiagnosticReport";
    case "MedicationRequest":
      return (
        resource.medicationCodeableConcept?.text ??
        resource.medicationCodeableConcept?.coding?.[0]?.display ??
        resource.id ??
        "MedicationRequest"
      );
    case "DocumentReference":
      return resource.description ?? resource.type?.text ?? resource.id ?? "DocumentReference";
    case "ServiceRequest":
      return resource.code?.text ?? resource.code?.coding?.[0]?.display ?? resource.id ?? "ServiceRequest";
    default:
      return resource.id ?? resource.resourceType;
  }
};

const CompositionCard = ({ compositions, resources }: Props) => {
  const resourceLookup = useMemo(() => {
    const lookup = new Map<string, any>();

    Object.entries(resources).forEach(([resourceType, values]) => {
      values.forEach((resource: any) => {
        if (resource?.id) {
          lookup.set(`${resourceType}/${resource.id}`, resource);
        }
      });
    });

    return lookup;
  }, [resources]);

  if (!compositions?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Discharge Summary
      </h2>

      <div className="space-y-5">
        {compositions.map((composition: any, compositionIndex: number) => {
          const sections = Array.isArray(composition.section)
            ? composition.section
            : [];

          return (
            <div
              key={composition.id ?? `composition-${compositionIndex}`}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Title</p>
                  <p className="font-medium text-slate-800">
                    {composition.title ?? composition.type?.text ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Type</p>
                  <p className="font-medium text-slate-800">
                    {composition.type?.text ?? composition.type?.coding?.[0]?.display ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-medium text-slate-800">
                    {composition.status ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-medium text-slate-800">
                    {formatDateToLocalTime(composition.date)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Patient Reference</p>
                  <p className="font-medium text-slate-800">
                    {composition.subject?.reference ?? composition.subject?.display ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Encounter Reference</p>
                  <p className="font-medium text-slate-800">
                    {composition.encounter?.reference ?? composition.encounter?.display ?? "-"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-slate-500">Authors</p>
                  <p className="font-medium text-slate-800">
                    {Array.isArray(composition.author) && composition.author.length > 0
                      ? composition.author
                          .map((author: any) => author?.display ?? author?.reference)
                          .filter(Boolean)
                          .join(", ")
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700">Sections</h3>

                {sections.length === 0 && (
                  <p className="text-sm text-slate-500">No sections available.</p>
                )}

                {sections.map((section: any, sectionIndex: number) => {
                  const entries = Array.isArray(section?.entry) ? section.entry : [];

                  return (
                    <div
                      key={`${composition.id ?? "composition"}-${sectionIndex}`}
                      className="rounded-md border border-slate-200 bg-slate-50 p-3"
                    >
                      <p className="font-medium text-slate-800">
                        {section?.title ?? section?.code?.text ?? `Section ${sectionIndex + 1}`}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {stripHtml(section?.text?.div)}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {entries.length === 0 && (
                          <span className="text-xs text-slate-500">No linked resources.</span>
                        )}

                        {entries.map((entry: any, entryIndex: number) => {
                          const reference = entry?.reference;
                          const resolved = reference ? resourceLookup.get(reference) : null;

                          return (
                            <span
                              key={`${reference ?? "entry"}-${entryIndex}`}
                              className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700"
                            >
                              {resolved
                                ? `${resolved.resourceType}: ${getResourceSummary(resolved)}`
                                : getReferenceLabel(reference)}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompositionCard;
