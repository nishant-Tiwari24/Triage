import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MetadataTable = () => {
  const [metaData, setMetaData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/mft-entry");
        setMetaData(response.data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };
    fetchMetaData();
  }, []);

  // Function to handle navigation based on button click
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <div className="w-[300px]">
        <Sidebar />
      </div>

      <div className="flex-grow p-8 relative">
        <h1 className="text-2xl font-normal mb-6">Metadata Information ⚙️</h1>

        {/* Button to navigate to Sample Info and Meta Data */}
        <div className="absolute top-6 right-6 space-x-4">
          <button
            className="bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-500"
            onClick={() => handleNavigation("/sample-info")}
          >
            Info
          </button>
          {/* <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            onClick={() => handleNavigation("/meta-data")}
          >
            Meta Data
          </button> */}
        </div>

        {metaData ? (
          <div>
            <div className="mb-6  bg-zinc-800 p-4 rounded-lg">
              <h2 className="text-xl mb-4">File Information 📂</h2>
              <p>
                <strong>File Name:</strong> {metaData.$FILE_NAME.Name}
              </p>
              <p>
                <strong>Parent MFT Entry:</strong>{" "}
                {metaData.$FILE_NAME.Parent_MFT_Entry}
              </p>
              <p>
                <strong>Sequence:</strong> {metaData.$FILE_NAME.Sequence}
              </p>
              <p>
                <strong>Flags:</strong> {metaData.$FILE_NAME.Flags.join(", ")}
              </p>
              <p>
                <strong>Created:</strong> {metaData.$FILE_NAME.Created}
              </p>
              <p>
                <strong>Accessed:</strong> {metaData.$FILE_NAME.Accessed}
              </p>
              <p>
                <strong>File Modified:</strong>{" "}
                {metaData.$FILE_NAME.File_Modified}
              </p>
              <p>
                <strong>MFT Modified:</strong>{" "}
                {metaData.$FILE_NAME.MFT_Modified}
              </p>
              <p>
                <strong>Actual Size:</strong> {metaData.$FILE_NAME.Actual_Size}
              </p>
              <p>
                <strong>Allocated Size:</strong>{" "}
                {metaData.$FILE_NAME.Allocated_Size}
              </p>
            </div>

            {/* $STANDARD_INFORMATION Section */}
            <div className="mb-6 bg-zinc-800 p-4 rounded-lg">
              <h2 className="text-xl mb-4">Standard Information ℹ️</h2>
              <p>
                <strong>Owner ID:</strong>{" "}
                {metaData.$STANDARD_INFORMATION.Owner_ID}
              </p>
              <p>
                <strong>Security ID:</strong>{" "}
                {metaData.$STANDARD_INFORMATION.Security_ID}
              </p>
              <p>
                <strong>Flags:</strong>{" "}
                {metaData.$STANDARD_INFORMATION.Flags.join(", ")}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {metaData.$STANDARD_INFORMATION.Created}
              </p>
              <p>
                <strong>Accessed:</strong>{" "}
                {metaData.$STANDARD_INFORMATION.Accessed}
              </p>
              <p>
                <strong>File Modified:</strong>{" "}
                {metaData.$STANDARD_INFORMATION.File_Modified}
              </p>
              <p>
                <strong>MFT Modified:</strong>{" "}
                {metaData.$STANDARD_INFORMATION.MFT_Modified}
              </p>
            </div>

            <div className="mb-6 bg-zinc-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Attributes 🏷️</h2>
              <table className="table-auto w-full text-lg text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-lime-600">Type</th>
                    <th className="px-4 py-2 text-lime-600">Resident</th>
                    <th className="px-4 py-2 text-lime-600">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {metaData.Attributes.map((attr, index) => (
                    <tr key={index} className="hover:bg-zinc-800">
                      <td className="px-2 py-2 text-white">{attr.Type}</td>
                      <td className="px-2 py-2 text-gray-300">
                        {attr.Resident ? "Yes" : "No"}
                      </td>
                      <td className="px-2 py-2 text-gray-300">
                        {attr.Size} bytes
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No metadata found.</p>
        )}
      </div>
    </div>
  );
};

export default MetadataTable;
