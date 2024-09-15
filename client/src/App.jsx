import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Upload from "./components/upload/Upload";
import AllFileData from "./components/fileData/AllFileData";
import PartitionTable from "./components/partition/PartitionTable";
import SampleInfo from "./components/sample/ImageInfo";
import MetadataTable from "./components/metadata/MetaData";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/disk-file-data" element={<AllFileData />} />
        <Route path="/partition-table" element={<PartitionTable />} />
        <Route path="/sample-info" element={<SampleInfo />} />
        <Route path="/meta-data" element={<MetadataTable />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
