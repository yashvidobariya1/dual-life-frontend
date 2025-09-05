import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosHourglass } from "react-icons/io";
import { FaChartSimple, FaUserClock } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { TbFileReport } from "react-icons/tb";
import { HiCalendarDateRange } from "react-icons/hi2";
import { PostCall } from "./ApiService";
import moment from "moment";
import Loader from "../Main/Loader";

const Dashboard = () => {
  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    {
      label: "Total Tests",
      value: "2,345",
      color: "blue",
      icon: <IoMdCheckmarkCircleOutline />,
    },
    {
      label: "Sub Admins Counts",
      value: "42",
      color: "green",
      icon: <HiMiniUsers />,
    },
    {
      label: "Admin Kits Available",
      value: "92.5%",
      color: "orange",
      icon: <FaChartSimple />,
    },
    {
      label: "total Kits Available",
      value: "78",
      color: "red",
      icon: <IoIosHourglass />,
    },
  ];

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

  if (loading) {
    return <Loader />;
  }

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
