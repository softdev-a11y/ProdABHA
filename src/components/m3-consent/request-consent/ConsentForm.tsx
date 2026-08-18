import { useState, useEffect } from "react";
import useM3 from "../../../hooks/useM3";

interface Props {
  patient: any;
  onSubmit: (payload: any) => void | Promise<void>;
  onBack: () => void;
}

const ConsentForm = ({ patient, onSubmit, onBack }: Props) => {
  const { getHospitals } = useM3();
  const [hiTypes, setHiTypes] = useState<string[]>([]);
  const [hiTypesError, setHiTypesError] = useState("");
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const todayString = formatDate(today);

  const eraseDate = new Date(today);
  eraseDate.setDate(eraseDate.getDate() + 30);
  const eraseDateString = formatDate(eraseDate);

  const HIU_ID = import.meta.env.VITE_M3_HIU_ID;
  const HIU_NAME = import.meta.env.VITE_M3_HIU_NAME;
  const PURPOSES = [
    {
      text: "Care Management",
      code: "CAREMGT",
      refUri: "http://terminology.hl7.org/ValueSet/v3-PurposeOfUse",
    },
    {
      text: "Bridge To Government",
      code: "BTG",
      refUri: "http://terminology.hl7.org/ValueSet/v3-PurposeOfUse",
    },
    {
      text: "Public Health",
      code: "PUBHLTH",
      refUri: "http://terminology.hl7.org/ValueSet/v3-PurposeOfUse",
    },
    {
      text: "Healthcare Payment",
      code: "HPAYMT",
      refUri: "http://terminology.hl7.org/ValueSet/v3-PurposeOfUse",
    }, 
    {
      text: "Disease Research",
      code: "DSRCH",
      refUri: "http://terminology.hl7.org/ValueSet/v3-PurposeOfUse",
    },
    {
      text: "Self Requested",
      code: "PATRQT",
      refUri: "http://terminology.hl7.org/ValueSet/v3-PurposeOfUse",
    }
  ];
  const HI_TYPES = [
    {
      label: "Prescription",
      value: "Prescription",
    },
    {
      label: "Diagnostic Report",
      value: "DiagnosticReport",
    },
    {
      label: "OP Consultation",
      value: "OPConsultation",
    },
    {
      label: "Discharge Summary",
      value: "DischargeSummary",
    },
  ];
  const [purpose, setPurpose] = useState(PURPOSES[0]);

  const [fromDate, setFromDate] = useState(todayString);
  const [toDate, setToDate] = useState(todayString);
  const [dataEraseAt, setDataEraseAt] = useState(eraseDateString);
  const [dataEraseTime, setDataEraseTime] = useState("23:59");

  // Load hospitals when component mounts
  useEffect(() => {
    const loadHospitals = async () => {
      if (!patient?.unitCode) {
        setHospitals([]);
        return;
      }
      const hospitalsList = await getHospitals(patient.unitCode);
      setHospitals(Array.isArray(hospitalsList) ? hospitalsList : []);
    };

    loadHospitals();
  }, [patient?.unitCode, getHospitals]);

  const handleHiTypeChange = (type: string) => {
    setHiTypesError("");

    if (hiTypes.includes(type)) {
      setHiTypes(hiTypes.filter((item) => item !== type));
    } else {
      setHiTypes([...hiTypes, type]);
    }
  };

  const handleSubmit = () => {
    if (hiTypes.length === 0) {
      setHiTypesError("Please select at least one HI type.");
      return;
    }
    const now = new Date();
    const localDateTime = new Date(`${dataEraseAt}T${dataEraseTime}:00`);

    const patientObj: any = {
      id: patient?.abhaAddress || "", // "dhananjay07@sbx",
      mrno: patient?.mrno?.trim(),
      patName: patient?.patName?.trim(),
      unitCode: patient?.unitCode?.trim(),
      patientAbhaNumber: patient?.abhaNumber?.trim(),
    };

    // Add hospitalName if hospital is selected
    if (selectedHospital?.hospitalName) {
      patientObj.hospitalName = selectedHospital.hospitalName;
    }

    const hipObj: any = {};

    // Only add hip.id if hospital is selected
    if (selectedHospital?.hipId) {
      hipObj.id = selectedHospital.hipId;
    }

    const payload = {
      consent: {
        purpose: {
          text: purpose.text,
          code: purpose.code,
          refUri: purpose.refUri,
        },

        patient: patientObj,
        ...(Object.keys(hipObj).length > 0 && { hip: hipObj }),

        hiu: {
          id: HIU_ID,
        },

        requester: {
          name: HIU_NAME, // name of the requester
          identifier: {
            type: "REGNO",
            value: "HIU12345", // inernal identifier for the requester
            system: "https://abc-hospital.com",
          },
        },

        hiTypes,

        permission: {
          accessMode: "VIEW",

          dateRange: {
            from: `${fromDate}T00:00:00.000Z`,
            to: now.toISOString()
          },

          dataEraseAt: localDateTime.toISOString(),
          frequency: {
            unit: "HOUR",
            value: 1,
            repeats: 0,
          },
        },

        careContexts: [],
      },
    };

    onSubmit(payload);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 lg:p-6">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
        Request Consent
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Fill the details below to request consent.
      </p>

      {/* Patient Details */}
      <div className="mt-5">
        <h3 className="mb-2 text-base font-semibold text-slate-800">
          Patient Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-2">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Patient Name
            </label>

            <input
              value={patient?.patName || ""}
              readOnly
              className="h-10 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">MR No</label>

            <input
              value={patient?.mrno || ""}
              readOnly
              className="h-10 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">ABHA ID</label>

            <input
              value={patient?.abhaNumber || ""}
              readOnly
              className="h-10 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              ABHA Address
            </label>

            <input
              value={patient?.abhaAddress || ""}
              readOnly
              className="h-10 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Hospital / Health Facility
              <span className="text-slate-400 text-xs"> (Optional)</span>
            </label>

            <select
              value={selectedHospital?.hospitalId || ""}
              onChange={(e) => {
                const selected = hospitals.find(
                  (h: any) => h.hospitalId === parseInt(e.target.value)
                );
                setSelectedHospital(selected || null);
              }}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
            >
              <option value="">Select Hospital (Optional)</option>
              {hospitals.map((hospital: any) => (
                <option key={hospital.hospitalId} value={hospital.hospitalId}>
                  {hospital.hospitalName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Consent Details */}
      <div className="mt-6">
        <h3 className="mb-2 text-base font-semibold text-slate-800">
          Consent Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-2">
          {/* Purpose */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Purpose of Access
            </label>

            <select
              value={purpose.code}
              onChange={(e) => {
                const selectedPurpose = PURPOSES.find(
                  (item) => item.code === e.target.value,
                );

                if (selectedPurpose) {
                  setPurpose(selectedPurpose);
                }
              }}
              className="h-10 w-full rounded-lg border border-slate-300 px-3"
            >
              {PURPOSES.map((item) => (
                <option key={`${item.code}-${item.text}`} value={item.code}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>

          {/* HI Types */}
          <div className="sm:col-span-2 xl:col-span-3">
            <label className="block text-sm text-slate-600 mb-1">
              HI Types
            </label>

            <div className="flex flex-wrap gap-2 rounded-lg border border-slate-300 p-2">
              {HI_TYPES.map((type) => (
                <label
                  key={type.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={hiTypes.includes(type.value)}
                    onChange={() => handleHiTypeChange(type.value)}
                  />
                  {type.label}
                </label>
              ))}
            </div>

            {hiTypesError && (
              <p className="mt-1 text-xs text-red-600">{hiTypesError}</p>
            )}
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">To Date</label>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3"
            />
          </div>

          {/* Frequency - Future Use */}
          {/*
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Frequency
                </label>

                <select className="h-11 w-full rounded-lg border border-slate-300 px-3">
                  <option>One-time</option>
                  <option>Recurring</option>
                </select>
              </div>
              */}

          {/* Data Erase At */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Consent Valid Upto
            </label>

            <div className="flex gap-2">
              <input
                type="date"
                value={dataEraseAt}
                onChange={(e) => setDataEraseAt(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 px-3"
              />

              <input
                type="time"
                value={dataEraseTime}
                onChange={(e) => setDataEraseTime(e.target.value)}
                className="h-10 rounded-lg border border-slate-300 px-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2">
        <button
          onClick={onBack}
          className="h-10 w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-5 text-sm hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="h-10 w-full sm:w-auto rounded-lg bg-teal-600 px-6 text-sm text-white hover:bg-teal-700"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default ConsentForm;
