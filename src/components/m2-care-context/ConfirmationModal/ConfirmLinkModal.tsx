import { useEffect } from "react";
interface Props {

  open: boolean;

  onClose: () => void;

  onConfirm: () => void;

  patient: any;

  hiTypes: any[];

  selectedCareContexts: string[];
}

const ConfirmLinkModal = ({
  open,
  onClose,
  onConfirm,
  patient,
  hiTypes,
  selectedCareContexts,
}: Props) => {
      useEffect(() => {

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [open]);

  const summary = hiTypes
  .map((section) => ({
    hiType: section.hiType,
    count: section.records.filter((record: any) =>
      selectedCareContexts.includes(record.referenceNumber)
    ).length,
  }))
  .filter((item) => item.count > 0);

const totalSelected = summary.reduce(
  (total, item) => total + item.count,
  0
);

  if (!open) return null;

  return (
  <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      {/* MODAL */}
   <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <h2 className="text-xl font-semibold text-gray-800">
            Confirm Link Records
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

        </div>

        {/* BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto">

          {/* PATIENT INFO */}
          <div className="border border-gray-200 rounded-xl p-5">

            <h3 className="font-semibold text-gray-800 mb-5">
              Patient Information
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Name
                </span>

                <span className="font-medium text-right">
                  {patient.patName}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  MR No
                </span>

                <span className="font-medium text-right">
                  {patient.mrno}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  ABHA Number
                </span>

                <span className="font-medium text-right">
                  {patient.abhaNumber}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  ABHA Address
                </span>

                <span className="font-medium text-right">
                  {patient.abhaAddress}
                </span>
              </div>

            </div>

          </div>

          {/* RECORD SUMMARY */}
          <div className="border border-gray-200 rounded-xl p-5">

            <h3 className="font-semibold text-gray-800 mb-5">
              Selected Records Summary
            </h3>

          <div className="space-y-4 text-sm">

            {summary.length === 0 ? (

              <p className="text-gray-500">
                No records selected.
              </p>

            ) : (

              <>
                {summary.map((item) => (

                  <div
                    key={item.hiType}
                    className="flex justify-between"
                  >

                    <span>
                      {item.hiType}
                    </span>

                    <span className="font-semibold">
                      {item.count}
                    </span>

                  </div>

                ))}

                <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-semibold">

                  <span>
                    Total Records
                  </span>

                  <span>
                    {totalSelected}
                  </span>

                </div>

              </>

            )}

          </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 px-6 py-4 flex flex-col lg:flex-row items-center justify-end gap-3">

          <button
            onClick={onClose}
            className="w-full lg:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full lg:w-auto px-6 py-2.5 rounded-lg bg-[#008080] hover:bg-[#006d6d] text-white transition"
          >
            Confirm
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmLinkModal;