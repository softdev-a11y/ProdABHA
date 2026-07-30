import { useContext, useState } from "react";
import { LoaderContext } from "../../context/LoaderProvider";
import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import SearchPatientCard from "../../components/m3-consent/search-patient/SearchPatientCard";
import PatientTable from "../../components/m3-consent/search-patient/PatientTable";
import useM3 from "../../hooks/useM3";

const SearchPatientPage = () => {
  const { searchPatients } = useM3();
  const { setLoading: setGlobalLoading }: any = useContext(LoaderContext);

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

const handleSearch = async (searchText: string) => {

  const unitCode = localStorage.getItem("selectedUnit");

  if (!searchText.trim()) {
    setPatients([]);
    return;
  }

  if (!unitCode) {
    console.log("Unit code not found");
    setPatients([]);
    return;
  }

  setLoading(true);
  setGlobalLoading(true);

  try {

    const response = await searchPatients(
      searchText,
      unitCode
    );

    setPatients(response ?? []);

  } catch (error) {

    console.log(error);
    setPatients([]);

  } finally {

    setLoading(false);
    setGlobalLoading(false);

  }
};

  return (
    <ConsentLayout hideOperatorPanel>
      <div className="w-full max-w-7xl space-y-4 sm:space-y-5">

        <SearchPatientCard
          onSearch={handleSearch}
          loading={loading}
        />

        <PatientTable
          data={patients}
          loading={loading}
        />

      </div>
    </ConsentLayout>
  );
};

export default SearchPatientPage;