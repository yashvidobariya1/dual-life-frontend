import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosHourglass } from "react-icons/io";
import { FaChartSimple, FaUserClock } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { TbFileReport } from "react-icons/tb";
import { HiCalendarDateRange } from "react-icons/hi2";
import { GetCall, PostCall } from "./ApiService";
import moment from "moment";
import Loader from "../Main/Loader";

const Dashboard = () => {
  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        setLoading(true);
        const response = await PostCall(
          "admin/getAllPatients?recentPatients=true"
        );
        if (response?.success) {
          setRecentRecords(response.patients);
        } else {
          console.error("Failed to fetch records:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching recent patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentRecords();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await GetCall("admin/getAdminDashboardStats");
        if (response?.success) {
          setDashboardData(response.data); // ✅ use response.data instead of patients
        } else {
          console.error("Failed to fetch dashboard data:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const stats = dashboardData
    ? [
        {
          label: "Total Tests",
          value: dashboardData.totalTests,
          color: "blue",
          icon: <IoMdCheckmarkCircleOutline />,
        },
        {
          label: "Sub Admins Counts",
          value: dashboardData.subAdminCount,
          color: "green",
          icon: <HiMiniUsers />,
        },
        {
          label: "Admin Kits Available",
          value: dashboardData.adminKitsAvailable,
          color: "orange",
          icon: <FaChartSimple />,
        },
        {
          label: "Total Kits Available",
          value: dashboardData.totalKitsAvailable,
          color: "red",
          icon: <IoIosHourglass />,
        },
      ]
    : [];

  const quickActions = [
    {
      title: "Add Sub-admin",
      subtitle: "Register new sub-admin",
      color: "blue",
      icon: <RiAdminFill />,
    },
    {
      title: "View All Test Records",
      subtitle: "Browse all test results",
      color: "green",
      icon: <FaUserClock />,
    },
    {
      title: "View Daily Report",
      subtitle: "Generate daily summary",
      color: "purple",
      icon: <TbFileReport />,
    },
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="card" key={index}>
            <div className={`icon ${item.color}`}>{item.icon}</div>
            <div className="info">
              <p className="label">{item.label}</p>
              <p className="value">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-grid">
          {quickActions.map((action, index) => (
            <button className="quick-btn" key={index}>
              <div className={`quick-icon ${action.color}`}>{action.icon}</div>
              <div className="dashboard-content">
                <p className="title-dashboard">{action.title}</p>
                <p className="subtitle">{action.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="recent-records">
        <h2>Recent Test Records</h2>
        {recentRecords.map((rec, index) => (
          <div key={index} className="record">
            <div className="record-header">
              <span className="aadhaar-details">
                Aadhaar: <b>{rec.aadhaarNumber}</b>
              </span>
            </div>
            <div className="record-footer">
              <span>
                <RiAdminFill /> {rec.name}
              </span>
              <span>
                <HiCalendarDateRange />{" "}
                {rec.registeredAt
                  ? moment(rec.registeredAt).format("DD/MM/YYYY")
                  : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
