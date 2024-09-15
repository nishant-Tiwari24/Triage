import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import axios from 'axios';

const AllFileData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/all-sample');
                setData(response.data.files); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen bg-zinc-900 text-white">
            {/* Sidebar with fixed width */}
            <div className="w-[400px]">
                <Sidebar />
            </div>

            {/* Main content area */}
            <div className="flex-grow p-8">
                <h1 className="text-2xl font-normal mb-6">Data of all the present Directories in the file ⚠️</h1>
                {data.length > 0 ? (
                    <div>
                        {/* Render data in a table */}
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 font-normal text-xl text-zinc-400">ID & Name</th>
                                    <th className="px-4 py-2 font-normal text-xl text-zinc-400">Path</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((file) => (
                                    <tr key={file.id} className="hover:bg-zinc-800">
                                        <td className="px-4 py-2 text-white">
                                            <strong className='text-lime-600'>{file.id}. {file.name}</strong> 
                                        </td>
                                        <td className="px-4 py-2 text-gray-300">: {file.path}</td>
                                    </tr>
                                ))}
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
