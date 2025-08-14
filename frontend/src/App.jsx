import { useEffect, useState } from "react";
import "./App.css";

import Table from "./components/table";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { io } from "socket.io-client";
import CustomDatePicker from "./components/custom_date_picker";
import DashboardModal from "./components/dashboard_modal";
import { getQuery } from "./utils";
import DashboardButton from "./components/dashboard_button";

const animatedComponents = makeAnimated();

function App() {
  const socket = io("http://localhost:3500");

  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    levels: [],
    resourceId: "",
    startDate: "",
    endDate: "",
  });

  const [showDashboard, setShowDashboard] = useState(false);
  const options = [
    { value: "error", label: "Error" },
    { value: "warn", label: "Warn" },
    { value: "debug", label: "Debug" },
    { value: "info", label: "Info" },
  ];

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const query = getQuery(filters);

    const fetchLogs = async () => {
      var res = await fetch(`http://localhost:3500/logs?${query.toString()}`, {
        method: "GET",
      });

      if (res.status === 200) {
        const logsArr = await res.json();

        setLogs(logsArr.logs);
      }
    };

    fetchLogs();
    socket.on("logs:new", (log) => setLogs((prev) => [log, ...prev]));

    return () => socket.disconnect();
  }, [filters]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="my-10 font-bold text-5xl">Log and Query System</p>

      <div className="flex flex-col items-center justify-center w-full mb-10">
        <div className="flex items-center justify-center mb-6 w-1/2 space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
          />

          <Select
            options={options}
            className="w-full"
            isMulti
            components={animatedComponents}
            placeholder="Select Level"
            onChange={(e) => {
              const selected = Array.from(e, (opt) => opt.value);
              handleChange("levels", selected);
            }}
          />
        </div>

        <div className="flex items-center justify-center mb-6 w-2/3 space-x-2">
          <input
            type="text"
            placeholder="Resource Id"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex p-2.5"
            value={filters.resourceId || ""}
            onChange={(e) => handleChange("resourceId", e.target.value)}
          />

          <CustomDatePicker
            value={filters.startDate}
            placeholder="Start Date"
            onChange={(date) => handleChange("startDate", date)}
          />

          <CustomDatePicker
            value={filters.endDate}
            placeholder="End Date"
            onChange={(date) => handleChange("endDate", date)}
          />

          <DashboardButton onClick={() => setShowDashboard(true)} />
        </div>
      </div>

      <Table logs={logs} />
      <DashboardModal
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
        logs={logs}
      />
    </div>
  );
}

export default App;
