import React, { useState } from 'react';
import { InboxIcon, CheckCircleIcon } from 'lucide-react';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (file) {
      console.log('Uploading:', file);
    }
  };
//TODO: Add the types of files that can be uploaded
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-3xl font-normal text-zinc-100 mb-8">Automation of Uploaded Disk Images</h1>
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700 text-center w-full max-w-md">
        <div className="border-dotted border-4 border-blue-700 rounded-lg p-6 mb-4">
          <InboxIcon className="w-12 h-12 text-blue-500 mb-3 font-extralight mx-auto" />
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">Drag & Drop Disk Image</h2>
          <p className="text-zinc-400 mb-4">or click to select a file</p>

          <label className="cursor-pointer bg-zinc-700 text-green-600 py-2 text-sm px-4 rounded-lg hover:bg-zinc-600 hover:text-white transition duration-300 ease-in-out inline-block">
            <input
              type="file"
              accept=".iso,.img,.bin"
              className="hidden"
              onChange={handleFileChange}
            />
            {file ? file.name : "Select File"}
          </label>
        </div>

        <button
          onClick={handleUploadClick}
          className="bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 rounded-lg transition text-sm duration-300 ease-in-out disabled:opacity-50"
          disabled={!file}
        >
          Upload Your Disk Image
        </button>

        {file && (
          <div className="flex items-center justify-center mt-4 text-green-500">
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            <p>{file.name} selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
