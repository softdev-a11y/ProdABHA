    import { useContext,  useState } from "react";
    import { LoaderContext } from "../../context/LoaderProvider";
    import Sidebar from "../../components/m2-care-context/LinkedPatients/Sidebar";
    import { Menu } from "lucide-react";
    import { useM2 } from "../../hooks/useM2";
    import toast from "react-hot-toast";

    const DeepLinkNotificationPage = () => {
    const { sendSMS } = useM2();
        const { setLoading }: any = useContext(LoaderContext);


        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [collapsed, setCollapsed] = useState(false);


        const [mobileNumber, setMobileNumber] = useState("");
        const HIP_ID = import.meta.env.VITE_M2_HIP_ID;
        const HIP_NAME = import.meta.env.VITE_M2_HIP_NAME;

    

const handleSendSMS = async () => {
  if (!mobileNumber.trim()) {
    toast.error("Mobile Number is required.");
    return;
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    toast.error("Mobile Number must contain exactly 10 digits.");
    return;
  }

  try {
    setLoading(true);

  const payload = {
  abhaAddress: "string",

  notification: {
    phoneNo: mobileNumber,
    hip: {
      id: HIP_ID,
      name: HIP_NAME,
    },
  },

  isDeepLinking: true,
};

    const response = await sendSMS(payload);

    if (response?.success) {
      toast.success(response.message || "SMS sent successfully.");
      setMobileNumber("");
    } else {
      toast.error(response?.message || "Failed to send SMS.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};
    const handleClear = () => {
    setMobileNumber("");
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

            {/* PAGE */}
            <div className="flex-1 min-w-0 flex flex-col pt-16 lg:pt-0">
            {/* MOBILE TOPBAR */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
                <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded hover:bg-slate-100"
                >
                <Menu size={22} />
                </button>

            <h1 className="font-semibold text-slate-800">
    Deep Link Notification
    </h1>
                <div className="w-9 h-9" />
            </div>

            {/* CONTENT */}
            <div className="p-6 lg:p-8 overflow-x-hidden">
                {/* MAIN CARD */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div>
                    <h2 className="text-base font-semibold text-gray-900">
                Deep Link Notification
                    </h2>

                    <p className="text-xs text-gray-500 mt-2 mb-5">
                Enter the patient's mobile number to send a Deep Link SMS.
                    </p>
                </div>

            <div className="max-w-md">
    <label className="block text-sm font-medium mb-2">
        Mobile Number <span className="text-red-500">*</span>
    </label>

 <input
  type="text"
  inputMode="numeric"
  maxLength={10}
  value={mobileNumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  }}
  placeholder="Enter Mobile Number"
  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#008080]"
/>

    <div className="flex gap-3 mt-5">
    <button
    onClick={handleSendSMS}
    className="bg-[#008080] text-white px-6 py-2.5 rounded-lg hover:bg-[#006d6d]"
    >
    Send SMS
    </button>

    <button
    onClick={handleClear}
    className="border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-100"
    >
    Clear
    </button>
    </div>
    </div>

            
                </div>
            </div>
            </div>
        </div>
        );
    };

    export default DeepLinkNotificationPage;
