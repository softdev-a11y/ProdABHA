import { formatDate } from "../../../utils/formatDate";

interface Props {
  data: any[];
}

const PrescriptionTab = ({ data }: Props) => {
  if (data.length === 0) {
    return (
      <p className="text-center py-6 text-slate-500">
        No Prescriptions Available
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-slate-200 rounded-lg">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Medicine</th>
            <th className="px-4 py-3 text-left">Dosage</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-3">
                {item.medicationCodeableConcept?.text}
              </td>

              <td className="px-4 py-3">
                {item.dosageInstruction?.[0]?.text}
              </td>

              <td className="px-4 py-3">
                {item.status}
              </td>

              <td className="px-4 py-3">
                {formatDate(item.authoredOn)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionTab;