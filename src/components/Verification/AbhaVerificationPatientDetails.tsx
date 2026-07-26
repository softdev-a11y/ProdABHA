import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import useMaster from "../../hooks/useMaster";

type Props = {
  profile: any;
  typeData?: string;
  type?: string;
  onComplete?: (data: any) => void;
  isCompleted?: boolean;
};

type SelectOption = {
  label: string;
  value: string;
};

const normalizeDateInput = (value: string) => {
  if (!value) return "";

  const raw = String(value).trim();

  if (/^\d{8}$/.test(raw)) {
    const yyyy = raw.slice(0, 4);
    const mm = raw.slice(4, 6);
    const dd = raw.slice(6, 8);
    return `${yyyy}-${mm}-${dd}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  return "";
};

const normalizeGender = (value: string) => {
  const raw = String(value || "").trim().toUpperCase();

  if (raw === "M" || raw === "MALE") return "M";
  if (raw === "F" || raw === "FEMALE") return "F";
  if (raw === "O" || raw === "OTHER") return "O";

  return "";
};

const AbhaVerificationPatientDetails = ({
  profile,
  typeData,
  type,
  onComplete,
  isCompleted,
}: Props) => {
  const sourceProfile = profile?.profile || profile || {};
  const sourceAddress = sourceProfile?.address || {};

  const initialAbhaAddress = useMemo(() => {
    const profileAddress =
      (Array.isArray(sourceProfile?.phrAddress) && sourceProfile.phrAddress.join(',')) ||
      sourceProfile?.abhaAddress 
      profile?.abhaAddress ||
      "";

    if (profileAddress) {
      return profileAddress;
    }

    if (type === "abha" && typeof typeData === "string") {
      return typeData;
    }

    return "";
  }, [profile?.abhaAddress, sourceProfile?.abhaAddress, sourceProfile?.phrAddress, type, typeData]);

  const {
    countries,
    states,
    districts,
    cities,
    getCountries,
    getStates,
    getDistricts,
    getCities,
  } = useMaster();

  const [isLocked, setIsLocked] = useState(isCompleted || false);

  const [formData, setFormData] = useState<any>({
    firstName: sourceProfile?.firstName || "",
    middleName: sourceProfile?.middleName || "",
    lastName: sourceProfile?.lastName || "",
    dateOfBirth: normalizeDateInput(sourceProfile?.dateOfBirth || sourceProfile?.dob || ""),
    gender: normalizeGender(sourceProfile?.gender || ""),
    abhaNumber: profile?.abhaNumber || sourceProfile?.abhaNumber || "",
    abhaAddress: initialAbhaAddress,
    mobile:
      sourceProfile?.mobile ||
      (type === "mobile" && typeof typeData === "string" ? typeData : ""),
    email: sourceProfile?.email || "",
    aadhar: sourceProfile?.aadhar || "",
    addressLine: sourceAddress?.line || sourceProfile?.addressLine || "",
    pinCode: sourceAddress?.pincode || sourceProfile?.pinCode || "",
    stateId: sourceProfile?.stateId || "",
    districtId: sourceProfile?.districtId || "",
    cityId: sourceProfile?.cityId || "",
    countryId: sourceProfile?.countryId || "",
    abhaStatus: sourceProfile?.abhaStatus || profile?.abhaStatus || "",
    phrAddress: Array.isArray(sourceProfile?.phrAddress)
      ? sourceProfile.phrAddress
      : initialAbhaAddress
      ? [initialAbhaAddress]
      : [],
  });

  useEffect(() => {
    const loadMasterData = async () => {
      await Promise.all([getCountries(), getStates(), getDistricts(), getCities()]);
    };

    loadMasterData();
  }, []);

  useEffect(() => {
    if (states.length === 0 || districts.length === 0 || cities.length === 0 || countries.length === 0) {
      return;
    }

    setFormData((prev: any) => {
      const matchedState =
        states.find(
          (item: any) =>
            item.text?.toLowerCase()?.replace(/\s/g, "") ===
            sourceAddress?.state?.toLowerCase()?.replace(/\s/g, ""),
        ) ||
        states.find(
          (item: any) =>
            item.text?.toLowerCase()?.replace(/\s/g, "") ===
            sourceProfile?.stateName?.toLowerCase()?.replace(/\s/g, ""),
        );

      const matchedDistrict =
        districts.find(
          (item: any) =>
            item.text?.toLowerCase()?.replace(/\s/g, "") ===
            sourceAddress?.district?.toLowerCase()?.replace(/\s/g, ""),
        ) ||
        districts.find(
          (item: any) =>
            item.text?.toLowerCase()?.replace(/\s/g, "") ===
            sourceProfile?.districtName?.toLowerCase()?.replace(/\s/g, ""),
        );

      const matchedCity =
        cities.find(
          (item: any) =>
            item.text?.toLowerCase()?.replace(/\s/g, "") ===
            sourceAddress?.city?.toLowerCase()?.replace(/\s/g, ""),
        ) ||
        cities.find(
          (item: any) =>
            item.text?.toLowerCase()?.replace(/\s/g, "") ===
            sourceProfile?.cityName?.toLowerCase()?.replace(/\s/g, ""),
        );

      const matchedCountryByName = countries.find(
        (item: any) =>
          item.text?.toLowerCase()?.replace(/\s/g, "") ===
          String(sourceProfile?.country || sourceAddress?.country || "")
            .toLowerCase()
            .replace(/\s/g, ""),
      );

      return {
        ...prev,
        stateId: prev?.stateId || matchedState?.value || "",
        districtId: prev?.districtId || matchedDistrict?.value || "",
        cityId: prev?.cityId || matchedCity?.value || "",
        countryId:
          prev?.countryId ||
          matchedCountryByName?.value ||
          countries.find((item: any) => item.text?.toLowerCase()?.includes("india"))?.value ||
          "",
      };
    });
  }, [cities, countries, districts, sourceAddress?.city, sourceAddress?.country, sourceAddress?.district, sourceAddress?.state, sourceProfile?.cityName, sourceProfile?.country, sourceProfile?.districtName, sourceProfile?.stateName, states]);

  const genderOptions: SelectOption[] = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Other", value: "O" },
  ];

  const countryOptions = useMemo(
    () => countries.map((item: any) => ({ label: item.text, value: item.value })),
    [countries],
  );

  const stateOptions = useMemo(
    () => states.map((item: any) => ({ label: item.text, value: item.value })),
    [states],
  );

  const districtOptions = useMemo(
    () => districts.map((item: any) => ({ label: item.text, value: item.value })),
    [districts],
  );

  const cityOptions = useMemo(
    () => cities.map((item: any) => ({ label: item.text, value: item.value })),
    [cities],
  );

  const updateField = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    const mandatoryValues = [
      formData?.firstName,
      formData?.lastName,
      formData?.dateOfBirth,
      formData?.gender,
      formData?.mobile,
      formData?.abhaNumber,
      formData?.abhaAddress,
      formData?.addressLine,
      formData?.stateId,
      formData?.districtId,
      formData?.cityId,
      formData?.countryId,
      formData?.pinCode,
    ];

    if (mandatoryValues.some((item) => !String(item || "").trim())) {
      return false;
    }

    if (!/^\d{10}$/.test(String(formData?.mobile || "").trim())) {
      return false;
    }

    if (!/^\d{6}$/.test(String(formData?.pinCode || "").trim())) {
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (!formData?.firstName?.trim()) {
      toast.error("Please enter first name");
      return;
    }

    if (!formData?.lastName?.trim()) {
      toast.error("Please enter last name");
      return;
    }

    if (!formData?.dateOfBirth?.trim()) {
      toast.error("Please enter date of birth");
      return;
    }

    if (!formData?.gender?.trim()) {
      toast.error("Please select gender");
      return;
    }

    if (!formData?.mobile?.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      toast.error("Please enter valid 10 digit mobile number");
      return;
    }

    if (!formData?.addressLine?.trim()) {
      toast.error("Please enter address");
      return;
    }

    if (!formData?.stateId) {
      toast.error("Please select state");
      return;
    }

    if (!formData?.districtId) {
      toast.error("Please select district");
      return;
    }

    if (!formData?.cityId) {
      toast.error("Please select city");
      return;
    }

    if (!formData?.countryId) {
      toast.error("Please select country");
      return;
    }

    if (!formData?.pinCode?.trim() || !/^\d{6}$/.test(formData.pinCode.trim())) {
      toast.error("Please enter valid 6 digit pincode");
      return;
    }

    setIsLocked(true);

    const selectedState = stateOptions.find(
      (item: SelectOption) => item.value === formData.stateId,
    );
    const selectedDistrict = districtOptions.find(
      (item: SelectOption) => item.value === formData.districtId,
    );
    const selectedCity = cityOptions.find(
      (item: SelectOption) => item.value === formData.cityId,
    );
    const selectedCountry = countryOptions.find(
      (item: SelectOption) => item.value === formData.countryId,
    );

    onComplete?.({
      ...formData,
      abhaAddress: "",
      dob: formData.dateOfBirth,
      profile: {
        ...sourceProfile,
        ...formData,
        dob: formData.dateOfBirth,
        dateOfBirth: formData.dateOfBirth,
        country: selectedCountry?.label || sourceProfile?.country || "",
        address: {
          line: formData.addressLine,
          pincode: formData.pinCode,
          state: selectedState?.label || sourceAddress?.state || "",
          district: selectedDistrict?.label || sourceAddress?.district || "",
          city: selectedCity?.label || sourceAddress?.city || "",
          country: selectedCountry?.label || sourceAddress?.country || "",
        },
        phrAddress:
          Array.isArray(formData?.phrAddress) && formData.phrAddress.length > 0
            ? formData.phrAddress
            : formData?.abhaAddress
            ? [formData.abhaAddress]
            : [],
      },
    });
  };

  return (
    <div className="bg-white border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Patient Details</h2>

          <div className="text-sm text-gray-500 mt-1">
            Patient details are fetched from ABHA verification.
          </div>
        </div>

        {sourceProfile?.photo && (
          <div className="flex-shrink-0">
            <img
              src={`data:image/jpeg;base64,${sourceProfile.photo}`}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
            />
          </div>
        )}
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            value={formData?.firstName}
            readOnly={isLocked}
            onChange={(value: string) => updateField("firstName", value)}
          />

          <InputField
            label="Middle Name"
            value={formData?.middleName}
            readOnly={isLocked}
            onChange={(value: string) => updateField("middleName", value)}
          />

          <InputField
            label="Last Name"
            value={formData?.lastName}
            readOnly={isLocked}
            onChange={(value: string) => updateField("lastName", value)}
          />

          <InputField
            label="DOB"
            value={formData?.dateOfBirth}
            type="date"
            readOnly={isLocked}
            onChange={(value: string) => updateField("dateOfBirth", value)}
          />

          <DropdownField
            label="Gender"
            options={genderOptions}
            value={formData?.gender}
            onChange={(value: string) => updateField("gender", value)}
            isDisabled={isLocked}
          />

          <InputField label="ABHA Number" value={formData?.abhaNumber} readOnly />

          <InputField label="ABHA Address" value={formData?.abhaAddress} readOnly />

          <InputField
            label="Mobile"
            value={formData?.mobile}
            readOnly={isLocked}
            maxLength={10}
            onChange={(value: string) =>
              updateField("mobile", value.replace(/\D/g, ""))
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Email"
            value={formData?.email}
            readOnly={isLocked}
            onChange={(value: string) => updateField("email", value)}
          />

          <InputField
            label="Aadhaar Number"
            value={formData?.aadhar}
            readOnly={isLocked}
            maxLength={12}
            onChange={(value: string) =>
              updateField("aadhar", value.replace(/\D/g, ""))
            }
          />
        </div>

        <TextAreaField
          label="Address"
          value={formData?.addressLine}
          readOnly={isLocked}
          onChange={(value: string) => updateField("addressLine", value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DropdownField
            label="State"
            options={stateOptions}
            value={formData?.stateId}
            onChange={(value: string) => updateField("stateId", value)}
            isDisabled={isLocked}
          />

          <DropdownField
            label="District"
            options={districtOptions}
            value={formData?.districtId}
            onChange={(value: string) => updateField("districtId", value)}
            isDisabled={isLocked}
          />

          <DropdownField
            label="City"
            options={cityOptions}
            value={formData?.cityId}
            onChange={(value: string) => updateField("cityId", value)}
            isDisabled={isLocked}
          />

          <DropdownField
            label="Country"
            options={countryOptions}
            value={formData?.countryId}
            onChange={(value: string) => updateField("countryId", value)}
            isDisabled={isLocked}
          />

          <InputField
            label="PIN Code"
            value={formData?.pinCode}
            maxLength={6}
            readOnly={isLocked}
            onChange={(value: string) =>
              updateField("pinCode", value.replace(/\D/g, ""))
            }
          />

          <InputField label="ABHA Status" value={formData?.abhaStatus} readOnly />
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!isFormValid() || isLocked}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AbhaVerificationPatientDetails;

const InputField = ({
  label,
  value,
  readOnly,
  onChange,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  type?: string;
  maxLength?: number;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
    <label className="md:w-40 text-sm font-medium text-gray-700">{label}</label>

    <input
      type={type}
      readOnly={readOnly}
      value={value || ""}
      maxLength={maxLength}
      onChange={(e) => onChange?.(e.target.value)}
      className={`flex-1 border border-gray-300 rounded-md px-3 py-2 ${
        readOnly ? "bg-gray-100" : "bg-white"
      }`}
    />
  </div>
);

const TextAreaField = ({
  label,
  value,
  readOnly,
  onChange,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}) => (
  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
    <label className="md:w-40 text-sm font-medium text-gray-700">{label}</label>

    <textarea
      value={value || ""}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      className={`flex-1 border border-gray-300 rounded-md px-3 py-2 ${
        readOnly ? "bg-gray-100" : "bg-white"
      }`}
      rows={3}
    />
  </div>
);

const DropdownField = ({
  label,
  options,
  value,
  onChange,
  isDisabled,
}: {
  label: string;
  options: SelectOption[];
  value: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
    <label className="md:w-40 text-sm font-medium text-gray-700">{label}</label>

    <Select
      className="flex-1"
      options={options}
      isDisabled={isDisabled}
      value={options.find((item: SelectOption) => item.value === value) || null}
      onChange={(selected: any) => onChange?.(selected?.value || "")}
    />
  </div>
);
