import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const reportMarkdown = `
### Cyber Triage Report

---

#### **Summary of Findings**
This report provides a detailed analysis of various data segments, including partition information, file metadata, file system analysis, system logs, and other important findings. Each section contains specific recommendations to mitigate potential risks and ensure system stability and security.



### **1. Disk & Partition Information**

| **Partition** | **Start Sector** | **End Sector** | **Length (Sectors)** | **Description** |
|---------------|------------------|----------------|----------------------|-----------------|
| **Safety Table** | 0 | 0 | 1 | Meta Partition |
| **Unallocated** | 0 | 33 | 34 | Unused space |
| **GPT Header** | 1 | 1 | 1 | GPT Partition Table |
| **Partition Table** | 2 | 33 | 32 | GPT Partition Table |
| **Microsoft Reserved Partition** | 34 | 32767 | 32734 | Microsoft System Data |
| **Basic Data Partition** | 32768 | 1708031 | 1675264 | Windows File System |
| **Unallocated** | 1708032 | 1978367 | 270336 | Unused space |

**Analysis**:
- The disk has a **GPT partition table** with a reserved Microsoft partition.
- The primary **Basic Data Partition** starts at sector 32768 and extends over 1675264 sectors.
- Unallocated space both before and after the main partition could indicate space for recovery partitions or future use.

**Recommendation**:
- Review unallocated sectors to ensure they are not being used maliciously.
- Verify the integrity of the Basic Data Partition to ensure no corruption or tampering.

---

### **2. File Metadata (Sample: ReAgent.xml)**

| **Attribute** | **Value** |
|---------------|-----------|
| **MFT Entry** | 40 |
| **File Name** | ReAgent.xml |
| **Created** | 2024-08-20 04:17:30 (UTC) |
| **File Modified** | 2024-08-20 04:17:30 (UTC) |
| **MFT Modified** | 2024-08-20 04:17:30 (UTC) |
| **Accessed** | 2024-09-11 21:28:40 (UTC) |
| **Owner ID** | 0 (LocalSystem) |
| **Security ID** | 263 (S-1-5-32-544) |
| **Flags** | Hidden, System, Not Content Indexed |
| **Allocated Size** | 0 bytes |
| **Actual Size** | 1070 bytes |

**Analysis**:
- The file **ReAgent.xml** is system-critical, marked as **Hidden** and **Not Content Indexed**.
- There are no changes to the file after its creation on **August 20, 2024**.
- The **Owner** and **Security ID** suggest the file is under control of the LocalSystem account, which could pose security risks if misused.

**Recommendation**:
- Review permissions on system-critical files like **ReAgent.xml**.
- Ensure the file has not been altered or compromised.

---

### **3. File System Analysis (NTFS)**

**File Structure**:
- **$MFT (Master File Table)** and its mirror ($MFTMirr) have been identified and seem consistent.
- System files such as **$Boot**, **$Volume**, and **$LogFile** are present and appear unmodified.
- The presence of **$UsnJrnl** and **$Secure** flags potential security logging, but should be reviewed for tampering.

**File Integrity**:
- Files like **$Secure**, **$Quota**, and **$Extend** are used for security, quotas, and extended metadata, indicating an NTFS file system configuration in line with typical Windows installations.
- Files such as **$Extend\$UsnJrnl** may store change logs, which should be verified for tampering.

**Recommendation**:
- Perform an integrity check on core NTFS files such as **$MFT**, **$Volume**, and **$Secure**.
- Ensure system file logs (e.g., **$UsnJrnl**) are consistent with known activity.

---

### **4. Key File Findings**

| **File Path** | **Description** | **Flags/Attributes** |
|---------------|-----------------|----------------------|
| **fs0/Recovery/WindowsRE/Winre.wim** | Windows Recovery Environment | System |
| **fs0/System Volume Information** | Critical system logs and recovery data | Hidden, System |
| **fs0/$MFT** | NTFS Master File Table | Read-only |
| **fs0/Recovery\WindowsRE/boot.sdi** | Boot-related system file | System, Archive |

**Analysis**:
- Key files such as **Winre.wim** and **boot.sdi** indicate the presence of a **Windows Recovery Environment**.
- The **System Volume Information** contains critical recovery and logging data.
- The **MFT** file appears intact and uncorrupted, which is essential for file system integrity.

**Recommendation**:
- Ensure the **Windows Recovery Environment** is not tampered with.
- Monitor and regularly back up **System Volume Information** to ensure log integrity.

---

### **5. Logs & System Data**

| **Log Reference** | **Description** | **Recommendation** |
|-------------------|-----------------|-------------------|
| **storqosflt**     | Storage QoS filter potentially impacting storage traffic. | Review and monitor QoS driver for unusual activities. |
| **S-1-5-18**       | Elevated privileges running network services. | Limit network service exposure and ensure secure firewall configurations. |
| **PCIe SSD**       | Monitoring data on PCIe-based SSD. | Perform routine SSD health checks to ensure optimal performance. |

**Analysis**:
- System logs show normal operation, but the **LocalSystem** account running network services may present a risk if exploited.
- Regular monitoring of **QoS filter drivers** and **PCIe SSD health** can prevent system degradation.

**Recommendation**:
- Review system configurations for the **LocalSystem** account to prevent unauthorized service use.
- Ensure the **PCIe SSD** is monitored for wear and tear and replaced as necessary.

---

### **6. File Integrity and Forensics Findings**

| **File** | **File Name** | **Creation Date** | **Size** |
|----------|---------------|-------------------|----------|
| **ReAgent.xml** | Recovery settings file | 2024-08-20 | 1070 bytes |
| **boot.sdi** | Boot information file | 2024-08-20 | 1080 bytes |
| **Winre.wim** | Recovery image | 2024-08-20 | 512 MB |

**Analysis**:
- These files play a critical role in system recovery and are part of the Windows Recovery Environment.
- Any alteration in these files could compromise the system's ability to recover in the event of failure.

**Recommendation**:
- Regularly verify the integrity of recovery files and ensure they are securely backed up.

---

### **7. Recommendations**

- **Partition Integrity**: Run checks on the Basic Data Partition and monitor unallocated sectors for any changes or suspicious activity.
- **File Metadata**: Continuously audit key system files (e.g., **ReAgent.xml**, **boot.sdi**) to detect unauthorized modifications.
- **Storage Monitoring**: Monitor PCIe SSD health to prevent system slowdowns or potential failure.
- **Log Review**: Investigate system logs for unusual activity, particularly those related to the **LocalSystem** account running network services.

---

### **Conclusion**
The system appears mostly intact, but several areas, such as unallocated partitions, elevated network services, and core recovery files, should be closely monitored. Recommendations provided aim to mitigate any potential risks and ensure continued system security and stability.
`;

const storeInIpfs = async () => {};

const Report = () => {
  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 mt-10 font-sans text-gray-200 min-h-screen max-w-7xl mx-auto flex flex-col justify-center space-y-4">
      <ReactMarkdown
        children={reportMarkdown}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table
                className="min-w-full bg-zinc-800 text-gray-300 border border-zinc-700"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 border-b border-zinc-700 bg-zinc-700"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2 border-b border-zinc-700" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mb-2" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-zinc-600 pl-4 italic"
              {...props}
            />
          ),
          code: ({ node, ...props }) => (
            <code
              className="bg-zinc-700 text-zinc-200 p-1 rounded"
              {...props}
            />
          ),
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="mb-4 list-disc pl-5" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-4 list-decimal pl-5" {...props} />
          ),
        }}
      />
      <button
        onClick={storeInIpfs}
        className="fixed right-10 bottom-10 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow-lg"
      >
        Store it in IPFS
      </button>
    </div>
  );
};

export default Report;
