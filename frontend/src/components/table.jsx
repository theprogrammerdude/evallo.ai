import clsx from "clsx";

const Table = ({ logs }) => {
  const levelClasses = {
    error: "border-l-4 border-red-500 bg-red-50",
    warning: "border-l-4 border-yellow-500 bg-yellow-50",
    info: "border-l-4 border-blue-500 bg-blue-50",
    debug: "border-l-4 border-gray-400 bg-gray-50",
  };

  const levelTextColor = {
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
    debug: "text-gray-500",
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Resource Id
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
            <th scope="col" className="px-6 py-3">
              Level
            </th>
            <th scope="col" className="px-6 py-3">
              Timestamp
            </th>
            <th scope="col" className="px-6 py-3">
              Trace Id
            </th>
            <th scope="col" className="px-6 py-3">
              Span Id
            </th>
            <th scope="col" className="px-6 py-3">
              Commit
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((e, i) => (
            <tr
              className={clsx(
                "bg-white border-gray-200 hover:bg-gray-50",
                levelClasses[e.level]
              )}
              key={i}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {e.resourceId}
              </th>
              <td className="px-6 py-4">{e.message}</td>
              <td
                className={clsx(
                  "px-6 py-4 uppercase font-bold",
                  levelTextColor[e.level]
                )}
              >
                {e.level}
              </td>
              <td className="px-6 py-4">{e.timestamp}</td>
              <td className="px-6 py-4">{e.traceId}</td>
              <td className="px-6 py-4">{e.spanId}</td>
              <td className="px-6 py-4">{e.commit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
