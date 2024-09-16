import React, { useState } from 'react';
import { FileIcon, DatabaseIcon, PackageIcon, PackageOpenIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon: Icon, text, onClick, isOpen }) => (
  <button
    onClick={onClick}
    className={`flex items-center text-white px-4 py-2 rounded transition-colors duration-300 ${
      isOpen ? 'hover:bg-zinc-700' : 'justify-center'
    }`}
  >
    <Icon className={`w-5 h-5 mr-2 ${isOpen ? '' : 'text-white'}`} />
    {isOpen && <span>{text}</span>}
  </button>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const subtopics = [
    { id: 1, titles: 'Partition Table', icon: DatabaseIcon, direct: '/partition-table' },
    { id: 2, titles: 'Directory Details', icon: FileIcon, direct: '/disk-file-data' },
    { id: 3, titles: 'System logs Analytics', icon: PackageOpenIcon, direct: '/system-logs' },
    { id: 4, titles: 'Registry Analysis', icon: PackageIcon, direct: '/system-logs' },

    // { id: 3, titles: 'File Information', icon: PackageIcon, direct: '/sample-info' },
    // { id: 4, titles: 'Meta Information', icon: PackageOpenIcon, direct: '/meta-data' },

  ];

  const handleMenuItemClick = (id) => {
    console.log('Clicked item id:', id);
    navigate(id);
  };

  return (
    <div
      className={`fixed flex flex-col bg-gradient-to-br from-black to-zinc-800 min-h-screen border-r-2 border-zinc-800 overflow-y-scroll ${
        isOpen ? 'w-72' : 'w-20'
      } transition-width duration-300 ease-in-out`}
    >
      <div
        className={`flex-shrink-0 p-4 flex items-center ${
          isOpen ? 'justify-between' : 'justify-center'
        }`}
      >
        {isOpen && (
          <h1 className="text-xl px-2 font-light text-white">
            Automated Data 🔥
          </h1>
        )}
      </div>
      <hr className="bg-white" />
      <div className="mt-8 flex flex-col space-y-2 flex-grow px-2">
        {subtopics.map((subtopic) => (
          <MenuItem
            onClick={() => handleMenuItemClick(subtopic.direct)}
            key={subtopic.id}
            icon={subtopic.icon}
            text={subtopic.titles}
            isOpen={isOpen}
          />
        ))}
      </div>
      <div className="px-4 mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full rounded transition duration-300 ease-in-out ${
            isOpen
              ? 'bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600'
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
