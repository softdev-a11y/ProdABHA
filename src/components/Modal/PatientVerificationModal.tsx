import { CircleX } from "lucide-react";

type Props = {
  isOpen: boolean;
  abhaProfile: any;
  patientData?: any;
  isNewPatient?: boolean;
  onContinue: () => void;
  onCancel: () => void;
};

const InfoRow = ({ label, value }: { label: string; value: any }) => (
  <div className="grid grid-cols-[130px_1fr] items-start gap-2 text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="min-w-0 font-medium text-slate-800 break-words [overflow-wrap:anywhere]">
      {value || "-"}
    </span>
  </div>
);

const formatDob = (dob: string | undefined) => {
  if (!dob) return "-";

  const normalized = dob.trim();

  // Supports API format like 19730423 -> 23-04-1973
  if (/^\d{8}$/.test(normalized)) {
    const yyyy = normalized.slice(0, 4);
    const mm = normalized.slice(4, 6);
    const dd = normalized.slice(6, 8);
    return `${dd}-${mm}-${yyyy}`;
  }

  // Supports ISO-like format 1973-04-23 -> 23-04-1973
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    const [yyyy, mm, dd] = normalized.split("-");
    return `${dd}-${mm}-${yyyy}`;
  }

  return normalized;
};

const PatientVerificationModal = ({
  isOpen,
  abhaProfile,
  patientData,
  isNewPatient,
  onContinue,
  onCancel,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="border-b border-slate-200 px-5 md:px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Verify Patient Details
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Please review the details before continuing.
            </p>
          </div>

          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-700 transition-colors rounded-md p-1 cursor-pointer"
            aria-label="Close"
          >
            <CircleX />
          </button>
        </div>

        {/* BODY */}
        <div
          className={
            isNewPatient
              ? "p-5 md:p-6"
              : "grid grid-cols-1 md:grid-cols-2 gap-4 p-5 md:p-6"
          }
        >
          {/* LEFT - ABHA */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 md:p-5 w-full">
            <h3 className="font-semibold mb-4 text-emerald-700">
              ABHA Profile Details
            </h3>

            <div className="space-y-3">
              <InfoRow
                label="Full Name"
                value={`${abhaProfile?.firstName || ""} ${abhaProfile?.lastName || ""}`.trim()}
              />
              <InfoRow label="Gender" value={abhaProfile?.gender} />
              <InfoRow label="DOB" value={abhaProfile?.dob} />
              <InfoRow label="Mobile" value={abhaProfile?.mobile} />
              <InfoRow label="ABHA Number" value={abhaProfile?.abhaNumber} />
              <InfoRow label="ABHA Address" value={abhaProfile?.abhaAddress} />
            </div>
          </div>

          {/* RIGHT - EXISTING PATIENT */}
          {!isNewPatient && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 md:p-5 w-full">
              <h3 className="font-semibold mb-4 text-blue-700">
                Selected Patient Details
              </h3>

              <div className="space-y-3">
                <InfoRow
                  label="Patient Name"
                  value={`${patientData?.firstName || ""} ${patientData?.middleName || ""} ${patientData?.lastName || ""}`.replace(/\s+/g, " ").trim()}
                />
                <InfoRow label="MRNO / UHID" value={patientData?.mrNo} />
                <InfoRow label="Gender" value={patientData?.gender} />
                <InfoRow label="DOB" value={formatDob(patientData?.dateOfBirth)} />
                <InfoRow label="Mobile" value={patientData?.mobile} />
                <InfoRow label="Email" value={patientData?.email} />
                <InfoRow label="Address" value={patientData?.address?.line} />
                <InfoRow label="Pincode" value={patientData?.address?.pincode} />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-200 px-5 md:px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 bg-slate-50/70">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientVerificationModal;
