interface Props {
  practitioners: any[];
}

const PractitionerCard = ({ practitioners }: Props) => {
  if (!practitioners?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Practitioners
      </h2>

      <div className="space-y-4">
        {practitioners.map((practitioner) => (
          <div
            key={practitioner.id}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium">
                  {practitioner.name?.[0]?.text ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Qualification</p>
                <p className="font-medium">
                  {practitioner.qualification?.[0]?.code?.text ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium">
                  {practitioner.telecom?.find(
                    (t: any) => t.system === "phone"
                  )?.value ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">
                  {practitioner.telecom?.find(
                    (t: any) => t.system === "email"
                  )?.value ?? "-"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PractitionerCard;