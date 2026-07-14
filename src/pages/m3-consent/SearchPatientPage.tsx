import { useState } from "react";
import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import SearchPatientCard from "../../components/m3-consent/search-patient/SearchPatientCard";
import PatientTable from "../../components/m3-consent/search-patient/PatientTable";
import useM3 from "../../hooks/useM3";

const SearchPatientPage = () => {
  const { searchPatients } = useM3();

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchText: string) => {
    if (!searchText.trim()) {
      setPatients([]);
      return;
    }

    setLoading(true);

    try {
      const response = await searchPatients(searchText);

      setPatients(response ?? []);
    } catch (error) {
      console.log(error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConsentLayout>
      <div className="w-full max-w-7xl space-y-6">

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