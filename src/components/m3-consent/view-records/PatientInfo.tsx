const PatientInfo = ({ consent }: { consent: any }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold text-slate-800">
        Basic Patient Info
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* Name */}
        <div>
          <p className="text-xs text-slate-500">
            Name
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {consent.patName}
          </p>
        </div>

        {/* ABHA Address */}
        <div>
          <p className="text-xs text-slate-500">
            ABHA Address
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 break-all">
            {consent.patientAbhaAddress}
          </p>
        </div>

        {/* MR No */}
        <div>
          <p className="text-xs text-slate-500">
            MR No.
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {consent.mrno}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-xs text-slate-500">
            Status
          </p>

          <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {consent.status}
          </span>
        </div>

      </div>
    </div>
  );
};

export default PatientInfo;