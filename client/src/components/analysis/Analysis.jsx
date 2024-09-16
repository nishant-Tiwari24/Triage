import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Analysis = () => {
  const analysis = {
    analysis: [
      {
        category: "Security",
        log_reference: "storqosflt",
        description:
          "This log likely pertains to a storage Quality of Service (QoS) filter driver, which may influence how storage traffic is managed. If compromised, it could lead to unauthorized access to storage devices or manipulation of QoS policies.",
        recommendation:
          "Review the storqosflt driver configuration and ensure it is up to date. Investigate any unusual activity related to storage QoS policies.",
      },
      {
        category: "Security",
        log_reference: "S-1-5-18",
        description:
          "The LocalSystem SID (S-1-5-18) is running network services. This can be a potential security risk if misconfigured, as LocalSystem has elevated privileges.",
        recommendation:
          "Verify the services being run by the LocalSystem account, and ensure that proper access controls and firewall rules are in place.",
      },
      {
        category: "Network",
        log_reference:
          "http://+:443/sra_{BA195980-CD49-458b-9E23-C84EE0ADCD75}/",
        description:
          "The system is listening on port 443, which is typically used for HTTPS traffic. This URL is associated with Secure Remote Access (SRA), which can be a critical service for secure communication.",
        recommendation:
          "Ensure that the SSL/TTLS certificates for this service are valid and correctly configured. Monitor for any suspicious activity or unauthorized access attempts.",
      },
      {
        category: "Network",
        log_reference: "https://+:5986/wsman/",
        description:
          "Windows Remote Management (WinRM) service is running on port 5986. This is typically used for remote administration and PowerShell remoting.",
        recommendation:
          "Audit access logs for remote connections via WinRM. Ensure that only trusted hosts can access the WinRM service and enable strong authentication mechanisms.",
      },
      {
        category: "Storage",
        log_reference: "PCIe SSD",
        description:
          "The log contains information about a PCIe-based SSD (512GB). Monitoring this could help in identifying hardware degradation or I/O performance bottlenecks.",
        recommendation:
          "Perform routine health checks on the SSD to ensure optimal performance and monitor for any signs of hardware failure.",
      },
      {
        category: "File System",
        log_reference: "C:\\Windows\\System32\\DriverStore",
        description:
          "The path points to a driver executable (esif_uf.exe) used by Intel's Dynamic Platform and Thermal Framework. It's critical to system performance and thermal management.",
        recommendation:
          "Ensure that this executable is properly signed by Intel and is the latest version. Any outdated or corrupted versions should be updated to maintain system stability.",
      },
      {
        category: "DNS Error",
        log_reference: "No such host is known (0x80072AF9)",
        description:
          "This error indicates a failure to resolve the domain name 'time.windows.com', which is used for time synchronization via NTP (Network Time Protocol).",
        recommendation:
          "Check the DNS server settings and firewall configurations to ensure proper time synchronization. A failure in time sync can lead to security issues with certificates and logs.",
      },
      {
        category: "Remote Desktop",
        log_reference: "https://+:3392/rdp/",
        description:
          "An RDP (Remote Desktop Protocol) service is listening on port 3392. RDP is often targeted for unauthorized access.",
        recommendation:
          "Harden the RDP service by enabling network-level authentication (NLA), using strong passwords, and enforcing multi-factor authentication (MFA). Monitor for brute-force login attempts.",
      },
      {
        category: "Firewall",
        log_reference: "mfefire",
        description:
          "The log entry refers to McAfee's firewall service (mfefire), which is responsible for managing incoming and outgoing traffic.",
        recommendation:
          "Check the firewall rules to ensure that they are configured according to best practices. Regularly update McAfee firewall signatures to prevent security vulnerabilities.",
      },
      {
        category: "Time Service",
        log_reference: "VMICTimeProvider",
        description:
          "This is a time synchronization service for virtual machines running on Hyper-V. Accurate time is crucial for log management and security monitoring.",
        recommendation:
          "Ensure that the time provider is correctly configured and functioning. Synchronize VM times with a trusted NTP server to avoid discrepancies in time-sensitive operations.",
      },
    ],
  };

  // Count the number of logs per category for the bar chart
  const categoryCount = analysis.analysis.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: "Number of Logs per Category",
        data: Object.values(categoryCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white p-8">
      <div className="w-full max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-semibold text-lime-500 mb-4">
          Log Analysis
        </h2>

        <table className="min-w-full mb-8 bg-zinc-800 border-collapse border border-zinc-700">
          <thead>
            <tr>
              <th className="border border-zinc-700 p-2 text-left">Category</th>
              <th className="border border-zinc-700 p-2 text-left">
                Log Reference
              </th>
              <th className="border border-zinc-700 p-2 text-left">
                Description
              </th>
              <th className="border border-zinc-700 p-2 text-left">
                Recommendation
              </th>
            </tr>
          </thead>
          <tbody>
            {analysis.analysis.map((log, index) => (
              <tr key={index}>
                <td className="border border-zinc-700 p-2">{log.category}</td>
                <td className="border border-zinc-700 p-2">
                  {log.log_reference}
                </td>
                <td className="border border-zinc-700 p-2">
                  {log.description}
                </td>
                <td className="border border-zinc-700 p-2">
                  {log.recommendation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="max-w-[600px] mx-auto">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
