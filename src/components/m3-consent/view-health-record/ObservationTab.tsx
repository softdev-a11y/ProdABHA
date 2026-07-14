import { formatDate } from "../../../utils/formatDate";

interface Props {
  data: any[];
}

const ObservationTab = ({ data }: Props) => {
  if (data.length === 0) {
    return <p className="py-6 text-center">No Observations</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Observation</th>
            <th className="px-4 py-3 text-left">Value</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-3">{item.code?.text}</td>
              <td className="px-4 py-3">
                {item.valueQuantity
                  ? `${item.valueQuantity.value} ${item.valueQuantity.unit}`
                  : item.valueString}
              </td>
              <td className="px-4 py-3">{formatDate(item.effectiveDateTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObservationTab;