import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import useMaster from "../../hooks/useMaster";
import DatePicker from "react-multi-date-picker";
import Modal from "../shared/Modal";
import AadharSection from "../Registration/AadharSection";
import { ShieldCheck } from "lucide-react";

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

  const ddmmyyyy = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmyyyy) {
    const [, dd, mm, yyyy] = ddmmyyyy;
    return `${yyyy}-${mm}-${dd}`;
  }

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

  const formatAadharForSection = (value: string) => {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const openAadharVerificationModal = () => {
    const cleanAadhar = String(formData?.aadhar || "").replace(/\D/g, "");
    const cleanMobile = String(formData?.mobile || "").replace(/\D/g, "");

    if (!/^\d{12}$/.test(cleanAadhar)) {
      toast.error("Please enter valid 12 digit Aadhaar number");
      return;
    }

    if (!/^\d{10}$/.test(cleanMobile)) {
      toast.error("Please enter valid 10 digit mobile number");
      return;
    }

    setAadharVerificationModal(true);
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

  const formatDateToDDMMYYYY = (value: string) => {
    if (!value) return "";

    const [yyyy, mm, dd] = value.split("-");

    return `${dd}-${mm}-${yyyy}`;
  };

  const handleContinue = () => {
    if (!isAadharVerified) {
      toast.error("Please complete Aadhaar verification first");
      return;
    }

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
    debugger;
    onComplete?.({
      ...formData,
      abhaAddress: "",
      dob: formatDateToDDMMYYYY(formData.dateOfBirth),
      profile: {
        ...sourceProfile,
        ...formData,
        dob: formatDateToDDMMYYYY(formData.dateOfBirth),
        dateOfBirth:formatDateToDDMMYYYY(formData.dateOfBirth),
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


  const [aadharVerificationModal, setAadharVerificationModal] = useState(false);
  const [isAadharVerified, setIsAadharVerified] = useState(false); 
    // ✅ Aadhaar Done
  const onCompleteAadharVerification = (
    data: any,
    txn: string,
    mobile: string,
    aadhar: string,
  ) => {
    console.log("1profile", data);
    console.log("2txn", txn);
    console.log("3mobile", mobile);
    console.log("4aadhar", aadhar);

    const profileData = data?.profile || {};

    const stateName = String(profileData?.stateName || "").toLowerCase().replace(/\s/g, "");
    const districtName = String(profileData?.districtName || "").toLowerCase().replace(/\s/g, "");
    const cityName = String(profileData?.cityName || "").toLowerCase().replace(/\s/g, "");

    const matchedState = states.find(
      (item: any) => item.text?.toLowerCase()?.replace(/\s/g, "") === stateName,
    );
    const matchedDistrict = districts.find(
      (item: any) => item.text?.toLowerCase()?.replace(/\s/g, "") === districtName,
    );
    const matchedCity = cities.find(
      (item: any) => item.text?.toLowerCase()?.replace(/\s/g, "") === cityName,
    );
    const defaultCountry = countries.find((item: any) =>
      item.text?.toLowerCase()?.includes("india"),
    );

    setFormData((prev: any) => ({
      ...prev,
      firstName: profileData?.firstName || prev.firstName || "",
      middleName: profileData?.middleName || prev.middleName || "",
      lastName: profileData?.lastName || prev.lastName || "",
      dateOfBirth: normalizeDateInput(profileData?.dob || profileData?.dateOfBirth || prev.dateOfBirth || ""),
      gender: normalizeGender(profileData?.gender || prev.gender || ""),
      mobile: mobile || profileData?.mobile || prev.mobile || "",
      aadhar: aadhar?.replace(/\D/g, "") || prev.aadhar || "",
      abhaNumber:
        data?.abhaNumber || profileData?.abhaNumber || profileData?.ABHANumber || prev.abhaNumber || "",
      // abhaAddress:
      //   data?.abhaAddress ||
      //   profileData?.abhaAddress ||
      //   (Array.isArray(profileData?.phrAddress) ? profileData.phrAddress[0] : "") ||
      //   prev.abhaAddress ||
      //   "",
      abhaAddress:
        Array.isArray(profileData?.phrAddress) && profileData.phrAddress.length > 0
          ? profileData.phrAddress.join(",")
          : prev.abhaAddress || "",
      email: profileData?.email || prev.email || "",
      addressLine: profileData?.address || prev.addressLine || "",
      pinCode: profileData?.pinCode || prev.pinCode || "",
      stateId: matchedState?.value || prev.stateId || "",
      districtId: matchedDistrict?.value || prev.districtId || "",
      cityId: matchedCity?.value || prev.cityId || "",
      countryId: prev.countryId || defaultCountry?.value || "",
      abhaStatus: profileData?.abhaStatus || prev.abhaStatus || "",
      phrAddress: Array.isArray(profileData?.phrAddress)
        ? profileData.phrAddress
        : prev.phrAddress,
    }));

    setIsAadharVerified(true);
    setAadharVerificationModal(false);
    
  };

  return (
    <>
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

          {/* <InputField
            label="DOB"
            value={formData?.dateOfBirth}
            type="date"
            readOnly={isLocked}
            onChange={(value: string) => updateField("dateOfBirth", value)}
          /> */}

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="md:w-40 text-sm font-medium text-gray-700">DOB</label>

            <DatePicker
              value={formData?.dateOfBirth ? new Date(formData.dateOfBirth) : null}
              onChange={(date: any) => {
                // Store as YYYY-MM-DD internally
                const formattedDate = date ? date.format("YYYY-MM-DD") : "";
                updateField("dateOfBirth", formattedDate);
              }}
              readOnly={isLocked}
              maxDate={new Date()}
              format="DD-MM-YYYY"  // Only for display
              inputClass="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />

            {/* <input
              type={type}
              readOnly={readOnly}
              value={value || ""}
              maxLength={maxLength}
              onChange={(e) => onChange?.(e.target.value)}
              className={`flex-1 border border-gray-300 rounded-md px-3 py-2 ${
                readOnly ? "bg-gray-100" : "bg-white"
              }`}
            /> */}
          </div>


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

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="md:w-40 text-sm font-medium text-gray-700">Aadhaar Number</label>

            <div className="flex-1 relative">
              <input
                type="text"
                readOnly={isAadharVerified}
                value={formData?.aadhar || ""}
                maxLength={12}
                onChange={(e) => updateField("aadhar", e.target.value.replace(/\D/g, ""))}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 pr-10 ${
                  isLocked ? "bg-gray-100" : "bg-white"
                }`}
              />

              <button
                type="button"
                onClick={openAadharVerificationModal}
                className={`absolute inset-y-0 right-2 my-auto h-7 w-7 flex items-center justify-center ${
                  isAadharVerified
                    ? "text-green-600 hover:text-green-700"
                    : "text-blue-600 hover:text-blue-700"
                }`}
                title={isAadharVerified ? "Aadhaar verified" : "Verify Aadhaar"}
                aria-label="Verify Aadhaar"
              >
                <ShieldCheck size={18} />
              </button>
            </div>
          </div>

            

          

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
          disabled={!isFormValid() || isLocked || !isAadharVerified}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </div>

    <Modal
      isOpen={aadharVerificationModal}
      children={
        <AadharSection
          isCheckUserExistence={false}
          aadharNumberStr={formatAadharForSection(formData?.aadhar || "")}
          mobileStr={String(formData?.mobile || "").replace(/\D/g, "").slice(0, 10)}
          onComplete={onCompleteAadharVerification}
        />
      }
      showCloseBtn={true}
      title="Aadhaar Verification"
      onClose={()=>{ setAadharVerificationModal(false); }}
    />

    </>
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
