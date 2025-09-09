import React, { useEffect, useState } from "react";
import { GetCall, PostCall } from "../Screen/ApiService";
import "./Account.css";

const Account = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await GetCall("auth/me");
        if (response?.success) {
          setProfile(response.data);
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await PostCall("auth/update-profile", formData);
      if (response?.success) {
        setProfile(formData);
        setEditMode(false);
        alert("Profile updated successfully!");
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  if (!profile) return <p>Loading...</p>;

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
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              disabled={!editMode}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              disabled={!editMode}
              onChange={handleChange}
            />
          </label>
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

        {/* Action buttons */}
        <div className="account-actions">
          {!editMode ? (
            <button onClick={() => setEditMode(true)}>Edit</button>
          ) : (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
