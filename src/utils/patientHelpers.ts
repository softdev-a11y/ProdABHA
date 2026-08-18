export const formatDOB = (dob: string) => {
  if (!dob) return "";
  debugger;
  // Remove dashes if present
  const formatted = dob.replaceAll("-", "");

  // Convert DDMMYYYY -> YYYYMMDD
  if (formatted.length === 8) {
    const day = formatted.slice(0, 2);
    const month = formatted.slice(2, 4);
    const year = formatted.slice(4, 8);

    return `${year}${month}${day}`;
  }

  return formatted;
};

export const calculateAge = (dob: string) => {
  if (!dob) return "";

  // DOB format: DD-MM-YYYY
  const [day, month, year] = dob.split("-").map(Number);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return `${String(age).padStart(3, "0")}:00:00`;
};


export const getSalutation = (
  gender: string
) => {
  const normalized =
    gender?.toUpperCase();

  if (normalized === "M") return "004";
  if (normalized === "F") return "005";

  return "004";
};

export const getDistrictId = (
  districtName: string
) => {
  const districtMap: Record<
    string,
    string
  > = {
    central: "414",
    thane: "415",
    mumbai: "416"
  };

  return (
    districtMap[
      districtName
        ?.toLowerCase()
        ?.trim()
    ] || "414"
  );
};

export const getRegionId = (
  stateName: string
) => {
  const stateMap: Record<
    string,
    string
  > = {
    delhi: "022",
    maharashtra: "023"
  };

  return (
    stateMap[
      stateName
        ?.toLowerCase()
        ?.trim()
    ] || "022"
  );
};

export const getCityId = () => {
  return "004";
};

export const getCountryId = () => {
  return "079";
};