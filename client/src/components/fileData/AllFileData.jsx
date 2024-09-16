import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AllFileData = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/all-sample");
        setData(response.data);
        setSortedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((file) =>
      file.file_path.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedData(filteredData);
  }, [searchTerm, data]);

  const handleSampleData = () => {
    navigate("/sample-info");
  };

  const extractIdAndName = (fileInfo) => {
    const parts = fileInfo.split(":");
    const id = parts[0]?.trim();
    const name = parts[1]?.trim();
    return { id, name };
  };

  const handleSort = (column) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setSortedData(sorted);
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      {/* Sidebar with fixed width */}
      <div className="w-[400px] fixed top-0 left-0 h-full">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-grow ml-[300px] p-8">
        <h1 className="text-2xl font-normal mb-6">
          Data of all the present Directories in the file ⚠️
        </h1>

        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-zinc-700 rounded w-full"
            placeholder="Search by file path..."
          />
          <FaSearch className="ml-2 text-zinc-600" />
        </div>

        {sortedData.length > 0 ? (
          <div className="max-w-[1200px] overflow-x-auto">
            {/* Set max-width */}
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-zinc-800">
                  <th
                    className="px-2 py-2 font-normal text-xl text-zinc-400 cursor-pointer"
                    onClick={() => handleSort("file_id")}
                  >
                    File Id
                  </th>
                  <th
                    className="px-2 py-2 font-normal text-xl text-zinc-400 cursor-pointer"
                    onClick={() => handleSort("file_info")}
                  >
                    File Info
                  </th>
                  <th
                    className="px-2 py-2 font-normal text-xl text-zinc-400 cursor-pointer"
                    onClick={() => handleSort("file_path")}
                  >
                    Path
                  </th>
                  <th
                    className="px-2 py-2 font-normal text-xl text-zinc-400 cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status
                  </th>
                  <th
                    className="px-2 py-2 font-normal text-xl text-zinc-400 cursor-pointer"
                    onClick={() => handleSort("allocation")}
                  >
                    Allocation
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((file, index) => {
                  const { id, name } = extractIdAndName(file.file_info);
                  return (
                    <tr
                      key={index}
                      className="hover:bg-zinc-800 cursor-pointer"
                      onClick={handleSampleData}
                    >
                      <td className="px-2 py-2 text-white">
                        <strong className="text-lime-600">
                          {file.file_id}
                        </strong>
                      </td>
                      <td className="px-2 py-2 text-white">
                        <strong className="text-lime-600">
                          {id}. {name}
                        </strong>
                      </td>
                      <td className="px-2 py-2 text-gray-300">
                        {file.file_path}
                      </td>
                      <td className="px-2 py-2 text-gray-300">{file.status}</td>
                      <td className="px-2 py-2 text-gray-300">
                        {file.allocation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No files found.</p>
        )}
      </div>
    </div>
  );
};

export default AllFileData;
