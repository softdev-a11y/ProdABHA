import { formatDate } from "../../../utils/formatDate";

interface Props {
  data: any[];
}

const DiagnosticReportTab = ({ data }: Props) => {
  if (data.length === 0) {
    return <p className="py-6 text-center text-slate-500">No Diagnostic Reports</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Report</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Conclusion</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-3">{item.code?.text}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3">{formatDate(item.effectiveDateTime)}</td>
              <td className="px-4 py-3">{item.conclusion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiagnosticReportTab;