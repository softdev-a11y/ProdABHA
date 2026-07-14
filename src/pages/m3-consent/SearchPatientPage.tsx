import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import SearchPatientCard from "../../components/m3-consent/search-patient/SearchPatientCard";
import PatientTable from "../../components/m3-consent/search-patient/PatientTable";

const SearchPatientPage = () => {
  return (
    <ConsentLayout>
      <div className="w-full max-w-7xl space-y-6">
        <SearchPatientCard />
        <PatientTable />
      </div>
    </ConsentLayout>
  );
};

export default SearchPatientPage;