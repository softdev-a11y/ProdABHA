    import { useContext, useEffect, useState } from "react";
    import { Eye, Menu } from "lucide-react";
    import toast from "react-hot-toast";

    import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
    import { LoaderContext } from "../../context/LoaderProvider";
    import { useM2 } from "../../hooks/useM2";
    import {
  USER_INITIATED_STATUS,
  USER_INITIATED_STEP,
} from "../../constants/userInitiatedEnums";

    interface Transaction {
    id: number;
    transactionId: string;
    requestId: string;
    hipId: string;
    patientName: string;
    patientId: string;
    gender: string;
    yearOfBirth: number;
    mobileNumber: string;
    abhaNumber: string;
    abhaAddress: string;
    status: number;
    discoveryRequestedAtUtc: string;
    createdAtUtc: string;
    updatedAtUtc: string;
    currentStep: number;
    errorMessage?: string;
    }

    const UserInitiatedTransactionsPage = () => {
    const { getUserInitiatedTransactionsByDateRange } = useM2();

    const { setLoading }: any =
        useContext(LoaderContext);

    const [transactions, setTransactions] =
        useState<Transaction[]>([]);

    const [filteredTransactions, setFilteredTransactions] =
        useState<Transaction[]>([]);

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [collapsed, setCollapsed] =
        useState(false);

    const [fromDate, setFromDate] =
        useState("");

    const [toDate, setToDate] =
        useState("");

    useEffect(() => {
        setTransactions([]);
        setFilteredTransactions([]);
    }, []);

    const handleSearch = async () => {
        try {

        if (!fromDate || !toDate) {
            toast.error(
            "Please select both From Date and To Date."
            );
            return;
        }

        setLoading(true);

        const formattedFrom =
            fromDate.replaceAll("-", "");

        const formattedTo =
            toDate.replaceAll("-", "");

        const response =
            await getUserInitiatedTransactionsByDateRange(
            formattedFrom,
            formattedTo
            );

        if (response?.success) {
            setTransactions(response.data);
            setFilteredTransactions(response.data);
        } else {
            setTransactions([]);
            setFilteredTransactions([]);
        }

        } catch (error) {

        console.log(error);

        toast.error(
            "Unable to fetch transactions."
        );

        } finally {

        setLoading(false);

        }
    };

    const handleReset = () => {

        setFromDate("");
        setToDate("");

        setTransactions([]);
        setFilteredTransactions([]);

    };

const getStatusBadge = (status: number) => {

  const label =
    USER_INITIATED_STATUS[status] || "Unknown";

  let className =
    "bg-gray-100 text-gray-700";

  switch(status){

    case 1:
      className="bg-yellow-100 text-yellow-700";
      break;

    case 2:
      className="bg-green-100 text-green-700";
      break;

    case 3:
      className="bg-red-100 text-red-700";
      break;

  }

  return(
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );

};

    const formatDate = (date: string) =>
        new Date(date).toLocaleString();
    return (
    <div className="bg-[#f5f7fb] min-h-screen flex">

        <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        />

        <div className="flex-1 min-w-0 flex flex-col pt-16 lg:pt-0">

        {/* Mobile Header */}

        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">

            <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-slate-100"
            >
            <Menu size={22} />
            </button>

            <h1 className="font-semibold text-slate-800">
            User Initiated Transactions
            </h1>

            <div className="w-9 h-9" />

        </div>

        <div className="p-6 lg:p-8 overflow-x-hidden">

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">

            <div>

                <h2 className="text-base font-semibold text-gray-900">
                User Initiated Transactions
                </h2>

                <p className="text-xs text-gray-500 mt-2 mb-5">
                View user initiated transactions by selecting a date range.
                </p>

            </div>

            {/* Search */}

            <div className="flex flex-wrap items-end gap-5 mb-6">

                <div>

                <label className="block text-sm font-medium mb-2">
                    From Date
                </label>

                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) =>
                    setFromDate(e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#008080] outline-none"
                />

                </div>

                <div>

                <label className="block text-sm font-medium mb-2">
                    To Date
                </label>

                <input
                    type="date"
                    value={toDate}
                    onChange={(e) =>
                    setToDate(e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#008080] outline-none"
                />

                </div>

                <button
                onClick={handleSearch}
                className="bg-[#008080] hover:bg-[#006d6d] text-white px-6 py-2.5 rounded-lg"
                >
                Search
                </button>

                <button
                onClick={handleReset}
                className="border border-gray-300 hover:bg-gray-100 px-6 py-2.5 rounded-lg"
                >
                Reset
                </button>

            </div>

            {/* Table */}

            <div className="overflow-x-auto border rounded-lg">

                <table className="min-w-full">

                <thead className="bg-gray-50">

                    <tr className="text-left text-xs font-semibold text-gray-700">

                    <th className="px-5 py-3">
                        Transaction ID
                    </th>

                    <th className="px-5 py-3">
                        Patient Name
                    </th>

                    <th className="px-5 py-3">
                        ABHA Number
                    </th>

                    <th className="px-5 py-3">
                        Status
                    </th>
                    <th className="px-5 py-3">
                    Current Step
                    </th>

                    <th className="px-5 py-3">
                        Requested At
                    </th>

                    <th className="px-5 py-3 text-center">
                        Action
                    </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredTransactions.length === 0 ? (

                    <tr>

                        <td
                        colSpan={6}
                        className="text-center py-10 text-gray-500"
                        >
                        No Transactions Found
                        </td>

                    </tr>

                    ) : (

                    filteredTransactions.map((item) => (

                        <tr
                        key={item.id}
                        className="border-t hover:bg-gray-50"
                        >

                        <td className="px-5 py-4 whitespace-nowrap">

                            {item.transactionId.substring(0, 10)}...

                        </td>

                        <td className="px-5 py-4">

                            {item.patientName}

                        </td>

                        <td className="px-5 py-4">

                            {item.abhaNumber}

                        </td>

                        <td className="px-5 py-4">

                            {getStatusBadge(item.status)}

                        </td>
                        <td className="px-5 py-4">

                        {USER_INITIATED_STEP[item.currentStep]}

                        </td>

                        <td className="px-5 py-4">

                            {formatDate(
                            item.discoveryRequestedAtUtc
                            )}

                        </td>

                        <td className="px-5 py-4 text-center">

                            <button
                            onClick={() =>
                                setSelectedTransaction(item)
                            }
                            className="text-teal-600 hover:text-teal-800"
                            >

                            <Eye size={18} />

                            </button>

                        </td>

                        </tr>

                    ))

                    )}

                </tbody>

                </table>

            </div>

            <div className="mt-5 text-sm text-gray-500">

                Showing {filteredTransactions.length} of{" "}
                {transactions.length} records

            </div>
                        {/* Details Modal */}

                    {selectedTransaction && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 mx-4">

                    <div className="flex justify-between items-center border-b pb-3">

                        <h2 className="text-lg font-semibold">
                        Transaction Details
                        </h2>

                        <button
                        onClick={() => setSelectedTransaction(null)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        >
                        ✕
                        </button>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                        <div>
                        <p className="text-xs text-gray-500">Transaction ID</p>
                        <p className="font-medium break-all">
                            {selectedTransaction.transactionId}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Request ID</p>
                        <p className="font-medium break-all">
                            {selectedTransaction.requestId}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Patient Name</p>
                        <p className="font-medium">
                            {selectedTransaction.patientName}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">HIP ID</p>
                        <p className="font-medium">
                            {selectedTransaction.hipId}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">ABHA Number</p>
                        <p className="font-medium">
                            {selectedTransaction.abhaNumber}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">ABHA Address</p>
                        <p className="font-medium break-all">
                            {selectedTransaction.abhaAddress}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Gender</p>
                        <p className="font-medium">
                            {selectedTransaction.gender}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Year Of Birth</p>
                        <p className="font-medium">
                            {selectedTransaction.yearOfBirth}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Mobile Number</p>
                        <p className="font-medium">
                            {selectedTransaction.mobileNumber}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="mt-1">
                            {getStatusBadge(selectedTransaction.status)}
                        </div>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Current Step</p>
                        <p className="font-medium">
                            {
                            USER_INITIATED_STEP[
                                selectedTransaction.currentStep as keyof typeof USER_INITIATED_STEP
                            ]
                            }
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Error</p>

                        <p className="font-medium text-red-600 break-all">
                            {(() => {
                            try {
                                return selectedTransaction.errorMessage
                                ? JSON.parse(selectedTransaction.errorMessage).error?.message
                                : "N/A";
                            } catch {
                                return selectedTransaction.errorMessage || "N/A";
                            }
                            })()}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Requested At</p>
                        <p className="font-medium">
                            {formatDate(selectedTransaction.discoveryRequestedAtUtc)}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-500">Updated At</p>
                        <p className="font-medium">
                            {formatDate(selectedTransaction.updatedAtUtc)}
                        </p>
                        </div>

                    </div>

                    <div className="flex justify-end mt-8">

                        <button
                        onClick={() => setSelectedTransaction(null)}
                        className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006d6d]"
                        >
                        Close
                        </button>

                    </div>

                    </div>

                </div>

                )}

            </div>

        </div>

        </div>

    </div>

    );

    };

    export default UserInitiatedTransactionsPage;