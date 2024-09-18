import  { useState } from "react";
import Header from "../components/Header";
import MultiLevelSidebar from "../components/MultiLevelSidebar";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import ReportTable from "../components/ReportTable";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 mt-16">
        <MultiLevelSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"} mt-5`}>
          <MainContent />
          <ReportTable />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;