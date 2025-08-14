import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DashboardModal = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  const counts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([level, count]) => ({
    level,
    count,
  }));

  const levelColors = {
    error: "#ef4444", // red
    warning: "#f59e0b", // yellow
    info: "#3b82f6", // blue
    debug: "#6b7280", // gray
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Logs by Level</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" isAnimationActive={true}>
              {chartData.map((entry, index) => (
                <Cell
                  width={100}
                  key={`cell-${index}`}
                  fill={levelColors[entry.level] || levelColors.default}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardModal;
