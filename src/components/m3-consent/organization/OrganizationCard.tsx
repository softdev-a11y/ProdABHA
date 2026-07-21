interface Props {
  organizations: any[];
}

const OrganizationCard = ({ organizations }: Props) => {
  if (!organizations?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Organizations
      </h2>

      <div className="space-y-4">
        {organizations.map((organization) => (
          <div
            key={organization.id}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Organization Name</p>
                <p className="font-medium">
                  {organization.name ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Organization Type</p>
                <p className="font-medium">
                  {organization.type?.[0]?.coding?.[0]?.display ??
                    organization.type?.[0]?.text ??
                    "-"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationCard;