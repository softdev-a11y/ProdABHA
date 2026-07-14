interface Props {
  patient: any;
}

const PatientDetails = ({ patient }: Props) => {
  if (!patient) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-800">
        Patient Details
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

        <div>
          <p className="text-xs text-slate-500">Name</p>
          <p className="font-medium">
            {patient.name?.[0]?.text || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">ABHA Address</p>
          <p className="font-medium">
            {patient.identifier?.[0]?.value || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Gender</p>
          <p className="font-medium">
            {patient.gender || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">DOB</p>
          <p className="font-medium">
            {patient.birthDate || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Mobile</p>
          <p className="font-medium">
            {patient.telecom?.[0]?.value || "-"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default PatientDetails;