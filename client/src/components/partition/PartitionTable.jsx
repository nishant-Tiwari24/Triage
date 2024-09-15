import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import axios from 'axios';

const PartitionTable = () => {
    const [partitionData, setPartitionData] = useState(null);
    const [imgInfoData, setImgInfoData] = useState(null);

    useEffect(() => {
        // Fetch partition data
        const fetchPartitionData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/partitioninfo');
                setPartitionData(response.data.stdout); 
            } catch (error) {
                console.error('Error fetching partition data:', error);
            }
        };

        // Fetch img info data
        const fetchImgInfo = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/img_info');
                setImgInfoData(response.data);
            } catch (error) {
                console.error('Error fetching img info data:', error);
            }
        };

        fetchPartitionData();
        fetchImgInfo();
    }, []);

    return (
        <div className="flex min-h-screen bg-zinc-900 text-white">
            <div className="w-[400px]">
                <Sidebar />
            </div>

            <div className="flex-grow p-8">
                <h1 className="text-2xl font-normal mb-6">Disk and Partition Info ⚠️</h1>

                {imgInfoData ? (
                    <div className="mb-6 bg-zinc-800 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Disk Image Information 🧪</h2>
                        <p><strong>Image:</strong> {imgInfoData.image}</p>
                        <p><strong>File Format:</strong> {imgInfoData.file_format}</p>
                        <p><strong>Virtual Size:</strong> {imgInfoData.virtual_size.size_in_mib} MiB ({imgInfoData.virtual_size.size_in_bytes} bytes)</p>
                        <p><strong>Disk Size:</strong> {imgInfoData.disk_size.size_in_mib} MiB</p>
                        <p><strong>Child Node Path:</strong> {imgInfoData.child_node.path}</p>
                        <p><strong>Filename:</strong> {imgInfoData.child_node.filename}</p>
                    </div>
                ) : (
                    <p>No image info data found.</p>
                )}

                {partitionData ? (
                    <div>
                        <div className="mb-6">
                            <p><strong>Partition Table:</strong> {partitionData.partition_table}</p>
                            <p><strong>Offset Sector:</strong> {partitionData.offset_sector}</p>
                            <p><strong>Unit Size:</strong> {partitionData.unit_size}</p>
                        </div>
                        
                        <table className="table-auto w-full text-lg text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-lime-600">Slot</th>
                                    <th className="px-4 py-2 text-lime-600">Start</th>
                                    <th className="px-4 py-2 text-lime-600">End</th>
                                    <th className="px-4 py-2 text-lime-600">Length</th>
                                    <th className="px-4 py-2 text-lime-600">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partitionData.partitions.map((partition, index) => (
                                    <tr key={index} className="hover:bg-zinc-800">
                                        <td className="px-2 py-2 text-white">{partition.slot}</td>
                                        <td className="px-2 py-2 text-gray-300">{partition.start}</td>
                                        <td className="px-2 py-2 text-gray-300">{partition.end}</td>
                                        <td className="px-2 py-2 text-gray-300">{partition.length}</td>
                                        <td className="px-2 py-2 text-gray-300">{partition.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No partition data found.</p>
                )}
            </div>
        </div>
    );
};

export default PartitionTable;
