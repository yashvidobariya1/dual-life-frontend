import React from "react";
import "./Dashboard.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosHourglass } from "react-icons/io";
import { FaChartSimple, FaUserClock } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { TbFileReport } from "react-icons/tb";
import { HiCalendarDateRange } from "react-icons/hi2";

const Dashboard = () => {
  const stats = [
    {
      label: "Total Tests",
      value: "2,345",
      color: "blue",
      icon: <IoMdCheckmarkCircleOutline />,
    },
    {
      label: "Active Sub-admins",
      value: "42",
      color: "green",
      icon: <HiMiniUsers />,
    },
    {
      label: "Success Rate",
      value: "92.5%",
      color: "orange",
      icon: <FaChartSimple />,
    },
    {
      label: "Pending Tests",
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

  const recentRecords = [
    {
      aadhaar: "XXXX-XXXX-7890",
      status: "Approved",
      statusClass: "approved",
      subAdmin: "Rajesh Kumar",
      date: "Jan 7, 2023",
    },
    {
      aadhaar: "XXXX-XXXX-4567",
      status: "Pending",
      statusClass: "pending",
      subAdmin: "Priya Sharma",
      date: "Jan 6, 2023",
    },
    {
      aadhaar: "XXXX-XXXX-1234",
      status: "Rejected",
      statusClass: "rejected",
      subAdmin: "Amit Patel",
      date: "Jan 5, 2023",
    },
  ];

  return (
    <div className="dashboard">
      {/* Stats Section */}
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

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-grid">
          {quickActions.map((action, index) => (
            <button className="quick-btn" key={index}>
              <div className={`quick-icon ${action.color}`}>{action.icon}</div>
              <div>
                <p className="title">{action.title}</p>
                <p className="subtitle">{action.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Records */}
      <div className="recent-records">
        <h2>Recent Test Records</h2>
        {recentRecords.map((rec, index) => (
          <div key={index} className="record">
            <div className="record-header">
              <span className="aadhaar-details">
                Aadhaar: <b>{rec.aadhaar}</b>
              </span>
            </div>
            <div className="record-footer">
              <span>
                <RiAdminFill /> Sub-admin: {rec.subAdmin}
              </span>
              <span>
                <HiCalendarDateRange /> {rec.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
