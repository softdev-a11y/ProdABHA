  import { useContext, useState } from "react";
  import { LoaderContext } from "../../context/LoaderProvider";
  import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
  import SearchPatientCard from "../../components/m3-consent/search-patient/SearchPatientCard";
  import PatientTable from "../../components/m3-consent/search-patient/PatientTable";
  import useM3 from "../../hooks/useM3";
  import toast from "react-hot-toast";

  const SearchPatientPage = () => {
  const {
    searchPatients,searchPatientsByDateRange,} = useM3();
    const { setLoading: setGlobalLoading }: any = useContext(LoaderContext);
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const formatDate = (date: string) => {
    return date.replaceAll("-", "");
  };
  const handleSearch = async () => {

    const unitCode = localStorage.getItem("selectedUnit");

    try {

      // BOTH SEARCH TYPES FILLED

      if (
        search.trim() &&
        (fromDate || toDate)
      ) {

        toast.error(
          "Please use either Patient Name / MR No OR Date Range."
        );

        return;
      }

      // NOTHING ENTERED

      if (
        !search.trim() &&
        !fromDate &&
        !toDate
      ) {

        toast.error(
          "Please enter Patient Name / MR No or select Date Range."
        );

        return;
      }

      // ONLY ONE DATE

      if (
        (fromDate && !toDate) ||
        (!fromDate && toDate)
      ) {

        toast.error(
          "Please select both From Date and To Date."
        );

        return;
      }

      // MINIMUM 3 CHARACTERS

      if (search.trim() && search.trim().length < 3) {
        toast.error("Please enter at least 3 characters.");
        return;
      }

      // INVALID DATE RANGE

      if (
        fromDate &&
        toDate &&
        new Date(fromDate) > new Date(toDate)
      ) {

        toast.error(
          "From Date cannot be later than To Date."
        );

        return;
      }

      if (!unitCode) {
        toast.error("Unit code not found");
        return;
      }

      setLoading(true);
      setGlobalLoading(true);

      // NAME SEARCH

      if (search.trim()) {

        const response = await searchPatients(
          search,
          unitCode
        );

        setPatients(response ?? []);

        return;
      }

      // DATE RANGE SEARCH

      const response =
        await searchPatientsByDateRange(
          unitCode,
          formatDate(fromDate),
          formatDate(toDate)
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



  const handleReset = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setPatients([]);
  };

    return (
      <ConsentLayout hideOperatorPanel>
        <div className="w-full max-w-7xl space-y-4 sm:space-y-5">

            <SearchPatientCard
          search={search}
          setSearch={setSearch}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          onSearch={handleSearch}
          onReset={handleReset}
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