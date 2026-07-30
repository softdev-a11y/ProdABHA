  import { SearchCheck, Info } from "lucide-react";
  import { useEffect, useState } from "react";
  import useABDM from "../../hooks/useABDM";
  import toast from "react-hot-toast";

  type Props = {
    transactionId: string;
    onComplete?: (data: any) => void;
  };

  const AbhaSection = ({ transactionId, onComplete }: Props) => {

    const { getSuggestedAbhaIds, createCustomAbhaId, error } = useABDM();

    const [txnId] = useState(transactionId || "");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [custom, setCustom] = useState("");
    const [suggestedAbhaIds, setSuggestedAbhaIds] = useState<string[]>([]);

    // 🔹 Fetch Suggestions
    const getSuggestedAbhaId = async () => {

      if (!txnId) {
        toast.error("Transaction Id missing");
        return;
      }

      const response = await getSuggestedAbhaIds({ txnId });

      if (!response || !response.success) {
        toast.error(error || "Failed to fetch ABHA addresses");
        return;
      }

      try {
        const parsed = JSON.parse(response.data);

        if (parsed.success) {
          setSuggestedAbhaIds(parsed.abhaAddressList || []);
        } else {
          toast.error(parsed.message || "Failed to fetch suggestions");
        }
      } catch (err) {
        console.error("Parse error", err);
        toast.error("Unable to read ABHA address suggestions");
      }
    };

    useEffect(() => {
      getSuggestedAbhaId();
    }, []);

  const validateAbhaAddress = (value: string) => {

    if (value.length < 8) {
      return "ABHA Address must be at least 8 characters.";
    }

    if (value.length > 18) {
      return "ABHA Address cannot exceed 18 characters.";
    }

    if (!/^[A-Za-z0-9._]+$/.test(value)) {
      return "Only letters, numbers, one dot (.) and one underscore (_) are allowed.";
    }

    if (
      value.startsWith(".") ||
      value.endsWith(".") ||
      value.startsWith("_") ||
      value.endsWith("_")
    ) {
      return "Dot (.) and underscore (_) cannot be at the beginning or end.";
    }

    if ((value.match(/\./g) || []).length > 1) {
      return "Only one dot (.) is allowed.";
    }

    if ((value.match(/_/g) || []).length > 1) {
      return "Only one underscore (_) is allowed.";
    }

    return "";
  };

    // 🔹 Create ABHA
    const createAbhaId = async () => {

      const finalAddress = selectedAddress || custom.trim();

      if (!finalAddress) {
        toast.error("Please select or enter ABHA address");
        return;
      }

      const validationError =
        validateAbhaAddress(finalAddress);

      if (validationError) {
        toast.error(validationError);
        return;
      }
      
      const response = await createCustomAbhaId({
        txnId,
        abhaAddress: finalAddress,
      });

      if (!response || !response.success) {
        toast.error(error || "Failed to create ABHA ID");
        return;
      }

      try {
        const parsed = JSON.parse(response.data);

        if (parsed.success) {
          toast.success(parsed.message || "ABHA created successfully");

          onComplete?.(parsed); // 
        } else {
          toast.error(parsed.message || "Failed to create ABHA");
        }
      } catch (err) {
        console.error("Error", err);
        toast.error("Invalid ABHA response. Please try again.");
      }
    };

    return (
      <div className="space-y-5">

        {/* Title */}
        <h2 className="text-sm font-medium text-gray-700">
          Choose your ABHA Address
        </h2>

        {/* Suggestions */}
        <div className="max-h-[180px] overflow-y-auto rounded-lg border divide-y">
          {suggestedAbhaIds.length > 0 ? (
            suggestedAbhaIds.map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="abha"
                  value={item}
                  checked={selectedAddress === item}
                  onChange={() => {
                    setSelectedAddress(item);
                    setCustom("");
                  }}
                  className="accent-blue-600"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-400 p-3">
              No suggestions available
            </p>
          )}
        </div>

        {/* OR */}
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          OR
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">
            Create your own address
          </p>

          <div className="relative group">

            <Info
              size={16}
              className="text-blue-500 cursor-pointer"
            />

            <div className="absolute left-6 top-0 z-20 hidden w-80 rounded-lg border bg-white p-3 text-xs shadow-lg group-hover:block">

              <ul className="list-disc pl-4 space-y-1">
                <li>Minimum length: 8 characters</li>
                <li>Maximum length: 18 characters</li>
                <li>Only one dot (.) and one underscore (_) are allowed.</li>
                <li>Dot (.) and underscore (_) cannot be at the beginning or end.</li>
                <li>Only letters, numbers or a combination of both are allowed.</li>
              </ul>

            </div>

          </div>
        </div>

          <div className="flex">
            <input
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value.replace(/\s/g, ""));
                setSelectedAddress("");
              }}
              placeholder="Enter username"
              className="w-full border rounded-l-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md text-sm text-gray-600">
              @abdm
            </span>
          </div>

          {/* Availability UI (static for now) */}
          {/* {availabilityMsg && (
            <span className="text-xs text-gray-600">
              {availabilityMsg}
            </span>
          )} */}
        </div>

        {/* Button */}
        <button
          disabled={!selectedAddress && !custom}
          onClick={createAbhaId}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50"
        >
          Continue
        </button>

      </div>
    );
  };

  export default AbhaSection;