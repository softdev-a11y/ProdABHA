import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../context/LoaderProvider";
import { Search, RefreshCw } from "lucide-react";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
import RequestTable from "../../components/m3-consent/request-list/RequestTable";
import useM3 from "../../hooks/useM3";
import { useUnit } from "../../context/UnitContext";

const RequestListPage = () => {
  const { getConsentRequestList } = useM3();
  const { selectedUnit } = useUnit();
  const { setLoading: setGlobalLoading }: any = useContext(LoaderContext);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setGlobalLoading(true);

    const response = await getConsentRequestList( selectedUnit);

      if (response?.success) {
        setRequests(response.data || []);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.log(error);
      setRequests([]);
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const filteredData = requests.filter((item: any) => {
    const matchesSearch =
      item.patientAbhaAddress
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.status
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" ||
      item.status?.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <ConsentLayout hideOperatorPanel>
      <div className="space-y-4 sm:space-y-5">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Request List
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage all consent requests.
            </p>
          </div>

          <button
            onClick={loadRequests}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

        </div>

        {/* Filters */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 outline-none focus:border-teal-600"
              />

            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-teal-600"
            >
              <option>All</option>
              <option>REVOKED</option>
              <option>REQUESTED</option>
              <option>GRANTED</option>
            </select>

          </div>

        </div>

        {/* Table */}

        <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">

          <RequestTable
            data={filteredData}
            loading={loading}
          />

        </div>

      </div>
    </ConsentLayout>
  );
};

export default RequestListPage;