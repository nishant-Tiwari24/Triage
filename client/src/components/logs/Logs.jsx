import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import axios from "axios";

const Logs = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/system-logs");
        setData(response.data);
        setSortedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (column) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setSortedData(sorted);
  };

  const formatMessage = (message) => {
    if (Array.isArray(message)) {
      return message.join(", ");
    }
    return message;
  };

  const goToAnalysis = () => {
    navigate("/analysis");
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <div className="w-[400px] fixed top-0 left-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-grow ml-[300px] p-8 relative">
        <h1 className="text-2xl font-normal mb-6">
          Data of all the System Logs
        </h1>

        <button
          className="absolute top-6 right-6 bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-500"
          onClick={goToAnalysis}
        >
          Analyse
        </button>

        {sortedData.length > 0 ? (
          <div className="max-w-[1200px] overflow-x-auto">
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-zinc-800">
                  <th
                    className="px-2 py-2 font-normal text-xl text-zinc-400 cursor-pointer"
                    onClick={() => handleSort("time")}
                  >
                    Timestamps
                  </th>
                  <th
                    className="px-2 py-2 w-full font-normal text-xl text-zinc-400 cursor-pointer"
                    onClick={() => handleSort("message")}
                  >
                    Log Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((log, index) => (
                  <tr key={index} className="hover:bg-zinc-800 cursor-pointer">
                    <td className="px-2 py-2 text-white">
                      <strong className="text-lime-600">{log.time}</strong>
                    </td>
                    <td className="px-2 py-2 text-white">
                      {formatMessage(log.message)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No logs found.</p>
        )}
      </div>
    </div>
  );
};

export default Logs;
