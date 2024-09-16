import React from 'react';

const AllReports = () => {
  const reports = [
    { caseNo: '001', cidNo: 'C123', info: 'Info 1' },
    { caseNo: '002', cidNo: 'C124', info: 'Info 2' },
    { caseNo: '003', cidNo: 'C125', info: 'Info 3' },
    { caseNo: '004', cidNo: 'C126', info: 'Info 4' },
    // Add more report objects as needed
  ];

  return (
    <div className="p-8 h-screen">
      <h1 className="text-3xl font-bold mb-6">All Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-zinc-800 border-stone-700 border-2 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-2">
              <span className="font-semibold uppercase">Case No:</span> {report.caseNo}
            </div>
            <div className="mb-2">
              <span className="font-semibold uppercase">CID No:</span> {report.cidNo}
            </div>
            <div className="mb-2">
              <span className="font-semibold uppercase">Info:</span> {report.info}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReports;
