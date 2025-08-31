import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";

import "./App.css";
import Sidebar from "./Main/SideBar";
import Header from "./Main/Header";
import Dashboard from "./Screen/Dashboard";
import SubAdmin from "./Screen/SubAdmin";
import TestRecord from "./Screen/TestRecord";
import RecordDetails from "./Screen/RecordDetails";
import Report from "./Screen/Report";
import ReportDetails from "./Screen/ReportDetails";
import Login from "./Screen/Login";
import AdharVerfiy from "./User/AdharVerfiy";
import UserDashboard from "./User/UserDashboard";

function Layout({
  children,
  collapsed,
  setCollapsed,
  isMobile,
  sidebarOpen,
  setSidebarOpen,
}) {
  const location = useLocation();

  const isLoginOrAdharPage =
    location.pathname === "/" ||
    location.pathname === "/useradharverfiy" ||
    matchPath("/userdashboard/:id", location.pathname);

  if (isLoginOrAdharPage) {
    return children;
  }

  return (
    <div className={`app-container ${collapsed ? "collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <Header
          toggleSidebar={() =>
            isMobile ? setSidebarOpen(!sidebarOpen) : setCollapsed(!collapsed)
          }
        />
        {children}
      </div>
    </div>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Layout
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/useradharverfiy" element={<AdharVerfiy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sub-admins" element={<SubAdmin />} />
          <Route path="/test-records" element={<TestRecord />} />
          <Route
            path="/test-records/recorddetails"
            element={<RecordDetails />}
          />
          <Route path="/reports" element={<Report />} />
          <Route path="/reports/reportdetails" element={<ReportDetails />} />
          <Route path="/userdashboard/:id" element={<UserDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
