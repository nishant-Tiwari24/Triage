import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Upload from "./components/upload/Upload";
import AllFileData from "./components/fileData/AllFileData";
import PartitionTable from "./components/partition/PartitionTable";
import SampleInfo from "./components/sample/ImageInfo";
import MetadataTable from "./components/metadata/MetaData";
import Logs from "./components/logs/Logs";
import Analysis from "./components/analysis/Analysis";
import Report from "./components/report/FinalReport";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/disk-file-data" element={<AllFileData />} />
        <Route path="/system-logs" element={<Logs />} />
        <Route path="/partition-table" element={<PartitionTable />} />
        <Route path="/sample-info" element={<SampleInfo />} />
        <Route path="/meta-data" element={<MetadataTable />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
