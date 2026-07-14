  import { useState } from "react";
  import { Search, RefreshCw } from "lucide-react";

  import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";
  import RequestTable from "../../components/m3-consent/request-list/RequestTable";

  const RequestListPage = () => {
    const [status, setStatus] = useState("All");
    const [search, setSearch] = useState("");

    return (
      <ConsentLayout>
        <div className="space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Request List
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                View and manage all consent requests.
              </p>
            </div>

            <button
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

          </div>

          {/* Filters */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Search */}
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

              {/* Status */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-teal-600"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Granted</option>
              </select>

            </div>

          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <RequestTable />

          </div>

        </div>
      </ConsentLayout>
    );
  };

  export default RequestListPage;