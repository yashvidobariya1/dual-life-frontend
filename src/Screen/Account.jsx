import React from "react";
import { useSelector } from "react-redux";
import "./Account.css";

const Account = () => {
  const profile = useSelector((state) => state.auth.userInfo);

  return (
    <div className="account-card">
      <div className="account-container">
        <div className="account-flex">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.name
            )}&background=0D8ABC&color=fff&size=128`}
            alt={profile.name}
            className="account-avatar"
          />
          <div className="name-details">
            <h2 className="account-name">{profile.name}</h2>
            <p className="account-email">{profile.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="account-info">
          <p>
            <span>User ID:</span> {profile.userId}
          </p>
          <p>
            <span>Status:</span>{" "}
            <span
              className={`status ${profile.isActive ? "active" : "inactive"}`}
            >
              {profile.isActive ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
