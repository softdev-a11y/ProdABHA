interface Props {
  patient: any;
}

const PatientCard = ({ patient }: Props) => {
  if (!patient) {
    return null;
  }

  const abha =
    patient.identifier?.find(
      (id: any) => id.system?.includes("abdm")
    )?.value ?? "-";

  const mobile =
    patient.telecom?.find(
      (item: any) => item.system === "phone"
    )?.value ?? "-";

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Patient
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="text-sm text-gray-500">
            ABHA
          </label>

          <p>{abha}</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Name
          </label>

          <p>
            {patient.name?.[0]?.text ?? "-"}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Gender
          </label>

          <p>{patient.gender ?? "-"}</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Date Of Birth
          </label>

          <p>{patient.birthDate ?? "-"}</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Mobile
          </label>

          <p>{mobile}</p>
        </div>

      </div>
    </div>
  );
};

export default PatientCard;