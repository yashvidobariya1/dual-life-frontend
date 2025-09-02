import React, { useEffect, useState } from "react";
import "./SubAdmin.css";
import { IoCallOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { PostCall } from "../Screen/ApiService"; // <-- your API helper
import moment from "moment";
import { showToast } from "../Main/ToastManager";
import Loader from "../Main/Loader";

const SubAdmin = () => {
  const [step, setStep] = useState(0); // 0 = Aadhaar, 1 = OTP, 2 = Form
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subadminData, setsubadminData] = useState([]);
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [refId, setRefId] = useState("");
  const [verifyResponse, setVerifyResponse] = useState([]);
  const [filter, setFilter] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    email: "", // 🔹 added
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const subAdmins = [
    {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      tests: 245,
      success: "94.3%",
    },
    {
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      tests: 198,
      success: "91.2%",
    },
    {
      name: "Amit Patel",
      phone: "+91 76543 21098",
      tests: 312,
      success: "93.6%",
    },
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetAll = () => {
    setStep(0);
    setAadhaar("");
    setOtp("");
    setRefId("");
    setVerifyResponse([]);
    setFormData({
      name: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
    setShowModal(false);
    setLoading(false);
  };

  const openModal = () => {
    resetAll();
    setShowModal(true);
    setStep(0);
  };

  const goBack = () => {
    if (step === 1) {
      setOtp("");
      setRefId("");
    }
    if (step === 2) {
      setFormData((p) => ({ ...p, password: "", confirmPassword: "" }));
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const handleGenerateOtp = async () => {
    if (!aadhaar || aadhaar.length !== 12) {
      showToast("Enter valid 12-digit Aadhaar number", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await PostCall("verification/generate-otp", {
        aadhaarNumber: aadhaar,
      });
      const returnedRefId =
        res?.data?.refId || res?.refId || res?.data?.referenceId || "";

      if (res?.success && returnedRefId) {
        setRefId(returnedRefId);
        setStep(1);
      } else if (res?.success) {
        setStep(1);
      } else {
        showToast(res?.message || "Failed to generate OTP", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error generating OTP", "erorr");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      showToast("Enter valid 6-digit OTP", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await PostCall("verification/verify-otp", {
        refId,
        otp,
        aadhaarNumber: aadhaar,
      });

      console.log("OTP verify response:", res);

      if (res?.success) {
        setVerifyResponse(res.kycData);

        setFormData({
          name: res?.kycData?.name || "",
          aadhaar: aadhaar,
          email: "",
          mobileNumber: "",
          password: "",
          confirmPassword: "",
          kycDataId: res?.kycData?._id,
          dob: res?.kycData?.dob,
        });

        setStep(2);
      } else {
        showToast(res?.message || "Invalid OTP", "error");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      const msg =
        err?.response?.data?.message || err?.message || "Error verifying OTP";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log("Selected:", event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    const body = {
      aadhaarNumber: aadhaar,
      name: verifyResponse?.name,
      email: formData.email,
      phone: formData.mobileNumber,
      password: formData.password,
      kycDataId: verifyResponse?.address?._id,
      dob: verifyResponse?.dob,
    };
    try {
      const res = await PostCall("auth/register-subadmin", body);

      if (res?.success) {
        showToast("Sub-admin registered successfully!", "success");
        resetAll();
      } else {
        showToast(res?.message || "Failed to register Sub-admin", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        setLoading(true);
        const response = await PostCall(
          `admin/getAllSubAdmins?recentSubAdmins=${filter}`
        );
        if (response?.success) {
          setsubadminData(response.subAdmins);
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
  }, [filter]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="subadmin-view" className="subadmin-container">
      <div className="header">
        <h2 className="title">Sub-admin Management</h2>
        <button className="add-btn" onClick={openModal}>
          Add New Sub-admin
        </button>
      </div>

      <div className="list-container">
        <div className="filter">
          <label>Filter: </label>
          <select id="filter" value={filter} onChange={handleChange}>
            <option value="false">All</option>
            <option value="true">Recent</option>
          </select>
        </div>
        {subadminData.map((admin, index) => (
          <div key={index} className="list-item">
            <div className="list-header">
              <p className="admin-name">{admin.name}</p>
              <div className="actions">
                <button className="btn edit-btn">Edit</button>
                <button className="btn deactivate-btn">Deactivate</button>
              </div>
            </div>

            <div className="list-body">
              <p className="phone">
                <IoCallOutline /> {admin.phone}
              </p>
              <p className="stats">
                <FaCheck /> Total Tests: {admin.tests} | Success Rate:{" "}
                {admin.success}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {step === 0 && (
              <>
                <h3>Enter Aadhaar Number</h3>
                <input
                  type="text"
                  value={aadhaar}
                  onChange={(e) =>
                    setAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))
                  }
                  placeholder="Enter Aadhaar Number"
                  maxLength={12}
                  inputMode="numeric"
                />
                <div className="modal-actions">
                  <button
                    onClick={handleGenerateOtp}
                    className="btn save-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                  <button className="btn cancel-btn" onClick={resetAll}>
                    Cancel
                  </button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3>Enter OTP</h3>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter OTP"
                  maxLength={6}
                  inputMode="numeric"
                />
                <div className="modal-actions">
                  <button
                    onClick={handleVerifyOtp}
                    className="btn save-btn"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                  <button className="btn cancel-btn" onClick={resetAll}>
                    Cancel
                  </button>
                  <button
                    className="btn back-btn"
                    type="button"
                    onClick={goBack}
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Add New Sub-admin</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                  {/* Aadhaar (read-only) */}
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    readOnly
                  />

                  {/* Name (read-only) */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    readOnly
                  />

                  {/* Email (editable) */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />

                  {/* Mobile (editable) */}
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleFormChange}
                    required
                  />

                  {/* DOB (read-only) */}
                  <input
                    type="date"
                    name="dob"
                    value={
                      verifyResponse.dob
                        ? moment(verifyResponse.dob).format("YYYY-MM-DD")
                        : ""
                    }
                    readOnly
                  />

                  {/* Gender (read-only) */}
                  <input
                    type="text"
                    name="gender"
                    value={
                      verifyResponse?.gender === "M"
                        ? "Male"
                        : verifyResponse?.gender === "F"
                        ? "Female"
                        : ""
                    }
                    readOnly
                  />

                  {/* Password (editable) */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleFormChange}
                    required
                  />

                  {/* Confirm Password (editable) */}
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    required
                  />

                  <div className="modal-actions">
                    <button type="submit" className="btn save-btn">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn cancel-btn"
                      onClick={resetAll}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdmin;
