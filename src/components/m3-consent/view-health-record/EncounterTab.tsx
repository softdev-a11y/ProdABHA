import { formatDate } from "../../../utils/formatDate";

interface Props {
  data: any[];
}

const EncounterTab = ({ data }: Props) => {
  if (!data.length)
    return <p className="py-6 text-center">No OP Consultation</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Start</th>
            <th className="px-4 py-3">End</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-3">{item.serviceType?.text}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3">{formatDate(item.period?.start)}</td>
              <td className="px-4 py-3">{formatDate(item.period?.end)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EncounterTab;