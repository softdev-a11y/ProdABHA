  import { useState } from "react";

  interface Props {
    onSubmit: () => void;
    onBack: () => void;
  }

  const ConsentForm = ({ onSubmit, onBack }: Props) => {
    const [purpose, setPurpose] = useState("Care Management");
    const [hiType, setHiType] = useState("3 Selected");
    const [frequency, setFrequency] = useState("One-time");
    const [fromDate, setFromDate] = useState("2025-01-01");
    const [expiryDate, setExpiryDate] = useState("2026-05-01");
    const [remarks, setRemarks] = useState("");

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Request Consent
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Fill the details below to request consent.
        </p>

        {/* Patient Details */}

        <div className="mt-8">

          <h3 className="mb-4 font-semibold text-slate-800">
            Patient Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Patient Name
              </label>

              <input
                value="Ravi Kumar"
                readOnly
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                MR No
              </label>

              <input
                value="MRN001234"
                readOnly
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                ABHA ID
              </label>

              <input
                value="91-9999-8888-7777"
                readOnly
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                ABHA Address
              </label>

              <input
                value="ravi@abdm"
                readOnly
                className="h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3"
              />
            </div>

          </div>

        </div>

        {/* Consent Details */}

        <div className="mt-8">

          <h3 className="mb-4 font-semibold text-slate-800">
            Consent Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Purpose of Access
              </label>

              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 px-3"
              >
                <option>Care Management</option>
                <option>Treatment</option>
                <option>Insurance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                HI Types
              </label>

              <select
                value={hiType}
                onChange={(e) => setHiType(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 px-3"
              >
                <option>3 Selected</option>
                <option>Prescription</option>
                <option>Diagnostic Report</option>
                <option>OP Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Date Range
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 px-3"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Frequency
              </label>

              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 px-3"
              >
                <option>One-time</option>
                <option>Recurring</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Expiry Date
              </label>

              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 px-3"
              />
            </div>

            <div className="sm:col-span-2 xl:col-span-3">

              <label className="block text-sm text-slate-600 mb-2">
                Remarks (Optional)
              </label>

              <input
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks"
                className="h-11 w-full rounded-lg border border-slate-300 px-3"
              />

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">

          <button
            onClick={onBack}
            className="h-11 w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-6"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="h-11 w-full sm:w-auto rounded-lg bg-teal-600 px-6 text-white hover:bg-teal-700"
          >
            Submit Request
          </button>

        </div>

      </div>
    );
  };

  export default ConsentForm;