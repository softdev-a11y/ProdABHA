import { useContext, useEffect, useState } from "react";
import { Eye, Menu, X } from "lucide-react";
import toast from "react-hot-toast";

import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
import { LoaderContext } from "../../context/LoaderProvider";
import { useM2 } from "../../hooks/useM2";

interface Counter {
  counterId: number;
  counterCode: string;
  counterName: string;
  hipId: string;
  shareProfileUrl: string;
  qrCodeBase64: string;
  isActive: boolean;
  createdOnUtc: string;
}

const AbdmCounterPage = () => {

  const {
    createCounter,
    getCounters,
  } = useM2();

  const { setLoading }: any =
    useContext(LoaderContext);

  const [counterCode, setCounterCode] =
    useState("");

  const [counterName, setCounterName] =
    useState("");

  const [counters, setCounters] =
    useState<Counter[]>([]);

  const [selectedCounter, setSelectedCounter] =
    useState<Counter | null>(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(false);


  // GET COUNTERS
  const loadCounters = async () => {

    try {

      setLoading(true);

      const response =
        await getCounters();

      if (response?.success) {

        setCounters(
          response.data || []
        );

      } else {

        setCounters([]);

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Unable to fetch counters."
      );

    } finally {

      setLoading(false);

    }

  };


  // LOAD COUNTERS WHEN PAGE OPENS
  useEffect(() => {

    loadCounters();

  }, []);


  // CREATE COUNTER
  const handleCreateCounter = async () => {

    if (!counterCode.trim()) {

      toast.error(
        "Please enter Counter Code."
      );

      return;
    }

    if (!counterName.trim()) {

      toast.error(
        "Please enter Counter Name."
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await createCounter(
          counterCode.trim(),
          counterName.trim()
        );

      if (response?.success) {

        toast.success(
          "Counter created successfully."
        );

        setCounterCode("");
        setCounterName("");

        await loadCounters();

      } else {

        toast.error(
          response?.message ||
          "Unable to create counter."
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Unable to create counter."
      );

    } finally {

      setLoading(false);

    }

  };


  const formatDate = (
    date: string
  ) => {

    return new Date(date).toLocaleString();

  };


  return (

    <div className="bg-[#f5f7fb] min-h-screen flex">

      {/* SIDEBAR */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      <div className="flex-1 min-w-0 flex flex-col pt-16 lg:pt-0">


        {/* MOBILE HEADER */}

        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="p-2 rounded hover:bg-slate-100"
          >

            <Menu size={22} />

          </button>


          <h1 className="font-semibold text-slate-800">
            ABDM Counter
          </h1>


          <div className="w-9 h-9" />

        </div>


        {/* MAIN CONTENT */}

        <div className="p-6 lg:p-8 overflow-x-hidden">


          {/* CREATE COUNTER */}

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">


            <div className="mb-6">

              <h2 className="text-base font-semibold text-gray-900">
                Create Internal Form
              </h2>

              <p className="text-xs text-gray-500 mt-2">
                Create a new ABDM counter.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              {/* COUNTER CODE */}

              <div>

                <label className="block text-sm font-medium mb-2">
                  Counter Code
                </label>

                <input
                  type="text"
                  value={counterCode}
                  onChange={(e) =>
                    setCounterCode(e.target.value)
                  }
                  placeholder="Enter Counter Code"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#008080] outline-none"
                />

              </div>


              {/* COUNTER NAME */}

              <div>

                <label className="block text-sm font-medium mb-2">
                  Counter Name
                </label>

                <input
                  type="text"
                  value={counterName}
                  onChange={(e) =>
                    setCounterName(e.target.value)
                  }
                  placeholder="Enter Counter Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#008080] outline-none"
                />

              </div>


            </div>


            {/* CREATE BUTTON */}

            <div className="flex justify-end mt-5">

              <button
                onClick={handleCreateCounter}
                className="bg-[#008080] hover:bg-[#006d6d] text-white px-6 py-2.5 rounded-lg"
              >
                Create Counter
              </button>

            </div>


          </div>


          {/* COUNTER LIST */}

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">


            <div className="mb-6">

              <h2 className="text-base font-semibold text-gray-900">
                Counter List
              </h2>

              <p className="text-xs text-gray-500 mt-2">
                View active ABDM counters.
              </p>

            </div>


            <div className="overflow-x-auto border rounded-lg">

              <table className="min-w-full">

                <thead className="bg-gray-50">

                  <tr className="text-left text-xs font-semibold text-gray-700">

                    <th className="px-5 py-3">
                      Counter Code
                    </th>

                    <th className="px-5 py-3">
                      Counter Name
                    </th>

                    <th className="px-5 py-3">
                      HIP ID
                    </th>

                    <th className="px-5 py-3">
                      Status
                    </th>

                    <th className="px-5 py-3">
                      Created On
                    </th>

                    <th className="px-5 py-3 text-center">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {counters.length === 0 ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="text-center py-10 text-gray-500"
                      >
                        No Counters Found
                      </td>

                    </tr>

                  ) : (

                    counters.map((counter) => (

                      <tr
                        key={counter.counterId}
                        className="border-t hover:bg-gray-50"
                      >

                        <td className="px-5 py-4">
                          {counter.counterCode}
                        </td>

                        <td className="px-5 py-4">
                          {counter.counterName}
                        </td>

                        <td className="px-5 py-4">
                          {counter.hipId}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              counter.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >

                            {counter.isActive
                              ? "Active"
                              : "Inactive"}

                          </span>

                        </td>

                        <td className="px-5 py-4">
                          {formatDate(
                            counter.createdOnUtc
                          )}
                        </td>

                        <td className="px-5 py-4 text-center">

                          <button
                            onClick={() =>
                              setSelectedCounter(counter)
                            }
                            className="text-teal-600 hover:text-teal-800"
                            title="View QR Code"
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

              Showing {counters.length} counters

            </div>


          </div>


          {/* QR MODAL */}

          {selectedCounter && (

            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">


                {/* HEADER */}

                <div className="flex justify-between items-center border-b pb-3">

                  <h2 className="text-lg font-semibold">
                    Counter QR Code
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedCounter(null)
                    }
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >

                    <X size={20} />

                  </button>

                </div>


                {/* QR */}

                <div className="flex flex-col items-center mt-6">

                  <img
                    src={selectedCounter.qrCodeBase64}
                    alt="Counter QR Code"
                    className="w-72 h-72 object-contain border border-gray-200 rounded-lg p-2"
                  />


                  <div className="text-center mt-5">

                    <p className="font-semibold text-gray-800">
                      {selectedCounter.counterCode}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {selectedCounter.counterName}
                    </p>

                  </div>

                </div>


                {/* CLOSE */}

                <div className="flex justify-end mt-6">

                  <button
                    onClick={() =>
                      setSelectedCounter(null)
                    }
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

  );

};

export default AbdmCounterPage;