import { useState } from "react";

import { useNavigate } from "react-router-dom";

import SearchPatientCard from "../../components/m3-consent/SearchPatient/SearchPatientCard";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";

const SearchPatientPage = () => {
  const navigate = useNavigate();

  const [abhaAddress, setAbhaAddress] =
    useState("");

  return (
    <ConsentLayout currentStep={1}>

      <SearchPatientCard
        abhaAddress={abhaAddress}
        setAbhaAddress={setAbhaAddress}
        onSearch={() =>
          navigate("/m3/select-records")
        }
      />

    </ConsentLayout>
  );
};

export default SearchPatientPage;