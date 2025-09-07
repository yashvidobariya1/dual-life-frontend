import React, { useEffect, useState } from "react";
import "./SubAdmin.css";
import { IoCallOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { PostCall, PutCall } from "../Screen/ApiService";
import moment from "moment";
import { showToast } from "../Main/ToastManager";
import Loader from "../Main/Loader";
import { FaSearch } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SubAdmin = () => {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subadminData, setsubadminData] = useState([]);
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [refId, setRefId] = useState("");
  const [verifyResponse, setVerifyResponse] = useState([]);
  const [filter, setFilter] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchAadhaar, setSearchAadhaar] = useState("");

  // edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    email: "",
    mobileNumber: "",
    password: "",
    // confirmPassword: "",
    dob: "",
    // gender: "",
  });

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
      aadhaar: "",
      email: "",
      mobileNumber: "",
      password: "",
      // confirmPassword: "",
      dob: "",
      // gender: "",
    });
    setShowModal(false);
    setLoading(false);
    setIsEditMode(false);
    setEditId(null);
  };

  const openModal = () => {
    resetAll();
    setShowModal(true);
    setStep(0);
  };

  // const handleSearch = async () => {
  //   if (!searchAadhaar || searchAadhaar.length !== 12) {
  //     showToast("Enter valid 12-digit Aadhaar number", "error");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const res = await PostCall(
  //       `admin/getAllSubAdmins?aadhaarNumber=${searchAadhaar}`
  //     );
  //     if (res?.success) {
  //       setsubadminData(res.subAdmins || []);
  //       setTotalPages(1); // single result, so no pagination
  //     } else {
  //       showToast(res?.message || "No record found", "error");
  //       setsubadminData([]);
  //     }
  //   } catch (err) {
  //     console.error("Search error:", err);
  //     showToast("Error searching Aadhaar", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const goBack = () => {
    if (step === 1) {
      setOtp("");
      setRefId("");
    }
    // if (step === 2) {
    //   setFormData((p) => ({ ...p, password: "", confirmPassword: "" }));
    // }
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
      showToast("Error generating OTP", "error");
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

      if (res?.success) {
        setVerifyResponse(res.kycData);

        setFormData({
          name: res?.kycData?.name || "",
          aadhaar: aadhaar,
          email: "",
          mobileNumber: "",
          password: "",
          // confirmPassword: "",
          dob: res?.kycData?.dob,
          // gender: res?.kycData?.gender,
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
    const value = event.target.value === "true"; // convert to boolean
    setFilter(value);
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      setIsEditMode(true);
      setEditId(id);
      setShowModal(true);
      setStep(2); // jump directly to form

      const res = await PostCall(`admin/GetSubAdminById/${id}`);
      if (res?.success) {
        const subAdminData = res.subAdmin?.subAdmin || {};
        const dob = subAdminData.kycDataId?.dob || res.subAdmin?.dob || "";

        setFormData({
          name: subAdminData.name || "",
          aadhaar: subAdminData.aadhaarNumber || "",
          email: subAdminData.email || "",
          mobileNumber: subAdminData.phone || "",
          password: subAdminData.password || "",
          // confirmPassword: subAdminData.password || "", // usually confirm = password
          dob: dob ? dob.split("T")[0] : "", // format yyyy-mm-dd for input[type=date]
          // gender: subAdminData.gender || "",
        });
        setVerifyResponse({
          dob: subAdminData?.dob || "",
          // gender: subAdminData?.gender || "",
          name: subAdminData?.name || "",
        });
      } else {
        showToast(res?.message || "Failed to fetch profile", "error");
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
      showToast("Error fetching profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.password !== formData.confirmPassword) {
    //   showToast("Passwords do not match!", "error");
    //   return;
    // }

    const body = {
      aadhaarNumber: formData.aadhaar,
      name: formData.name,
      email: formData.email,
      phone: formData.mobileNumber,
      password: formData.password,
      dob: formData.dob,
      // gender: formData.gender,
    };

    try {
      let res;
      if (isEditMode) {
        res = await PostCall(`admin/updateAdminInventory`, body);
      } else {
        res = await PostCall("auth/register-subadmin", body);
      }

      if (res?.success) {
        showToast(
          isEditMode
            ? "Sub-admin updated successfully!"
            : "Sub-admin registered successfully!",
          "success"
        );
        resetAll();
      } else {
        showToast(res?.message || "Failed to save Sub-admin", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      setLoading(true);
      const body = { isActive: !currentStatus }; // flip the status
      const res = await PutCall(`admin/toggleSubAdmin/${id}`, body);

      if (res?.success) {
        showToast(res.message, "success");
        fetchRecentRecords();
      } else {
        showToast(res?.message || "Failed to update status", "success");
      }
    } catch (err) {
      console.error("Error toggling subadmin status:", err);
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentRecords = async () => {
    try {
      setLoading(true);
      const response = await PostCall(
        `admin/getAllSubAdmins?recentSubAdmins=${filter}&page=${page}&limit=${pageSize}&search=${searchAadhaar}`
      );
      if (response?.success) {
        setsubadminData(response.subAdmins);
        setTotalPages(response.totalPages || 1);
      } else {
        console.error("Failed to fetch records:", response?.message);
      }
    } catch (error) {
      console.error("Error fetching recent patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentRecords();
  }, [page, pageSize, filter, searchAadhaar]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="subadmin-view" className="subadmin-container">
      <div className="header">
        <h2 className="title-header">Sub Admin Management</h2>
        <button className="add-btn" onClick={openModal}>
          Add New Sub Admin
        </button>
      </div>
      <div className="filter">
        <div className="actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Aadhaar"
              value={searchAadhaar}
              onChange={(e) =>
                setSearchAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))
              }
              maxLength={12}
              // inputMode="numeric"
            />
            <span className="search-icon">
              <FaSearch />
            </span>
          </div>
          {/* <button className="filter-btn" onClick={fetchRecentRecords}>
            Search
          </button> */}
        </div>
        <div className="filter-subadmin">
          <label htmlFor="filter" className="filter-label">
            Filter :
          </label>
          <select
            id="filter"
            value={filter.toString()}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="false">All</option>
            <option value="true">Recent</option>
          </select>
        </div>
      </div>

      <div className="list-container">
        {subadminData.map((admin, index) => (
          <div key={index} className="list-item">
            <div className="list-header">
              <p className="admin-name">{admin.name}</p>
              <div className="actions">
                <button
                  className="btn edit-btn"
                  onClick={() => handleEdit(admin._id)}
                >
                  Edit
                </button>
                <button
                  className={`btn ${
                    admin.isActive ? "deactivate-btn" : "activate-btn"
                  }`}
                  onClick={() => handleToggleActive(admin._id, admin.isActive)}
                >
                  {admin.isActive ? "Deactivate" : "Activate"}
                </button>
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
            {/* Aadhaar Flow */}
            {!isEditMode && step === 0 && (
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

            {!isEditMode && step === 1 && (
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

            {/* Add/Edit Form */}
            {step === 2 && (
              <>
                <h3>{isEditMode ? "Edit Sub Admin" : "Add New Sub Admin"}</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                  {/* Aadhaar */}
                  <label>Addhar Number</label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    readOnly
                  />

                  {/* Name */}
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    readOnly={!isEditMode ? true : false}
                  />

                  {/* Email */}
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />

                  {/* Mobile */}
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleFormChange}
                    required
                  />

                  {/* DOB */}
                  <label>Date Of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={
                      formData?.dob
                        ? moment(formData.dob).format("YYYY-MM-DD")
                        : ""
                    }
                    readOnly
                  />

                  {/* Password */}
                  <div
                    className="password-input-wrapper"
                    style={{ position: "relative" }}
                  >
                    <label>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleFormChange}
                      required={!isEditMode}
                    />
                    <span
                      onClick={togglePassword}
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "65%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="btn save-btn">
                      {isEditMode ? "Update" : "Save"}
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

      {!filter && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default SubAdmin;
