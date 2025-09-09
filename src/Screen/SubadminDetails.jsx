import React, { useEffect, useState } from "react";
import "./SubadminDetials.css";
import { useNavigate, useParams } from "react-router-dom";
import { PostCall } from "./ApiService";
import Loader from "../Main/Loader";

const SubadminDetials = () => {
  const { id } = useParams();
  const [SubadminDetials, setSubadminDetials] = useState([]);
  const [recordhealthDetials, setrecordhealthDetials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await PostCall(`admin/GetSubAdminById/${id}`);
        if (response?.success) {
          const subAdmin = response?.subAdmin?.subAdmin || {};
          const dob = response?.subAdmin?.dob || null;

          // merge everything you want in one object
          setSubadminDetials({
            ...subAdmin,
            dob, // take dob from parent
            performance: subAdmin.performance || {},
            KitInventory: subAdmin.KitInventory || {},
            kitsAssigned: subAdmin.kitsAssigned || 0,
            kitUsageHistory: subAdmin.kitUsageHistory || [],
            patientHistory: subAdmin.patientHistory || [],
            kitUsageHistory: subAdmin.kitUsageHistory || [],
          });

          setrecordhealthDetials(
            response?.subAdmin?.reports?.[0]?.healthResults || {}
          );
        } else {
          console.error("Failed to fetch patient:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="test-details-view" className="test-details-container">
      <div className="header">
        <h2 className="title">Sub Admin Details</h2>
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          Back to List
        </button>
      </div>

      <div className="card-testdetails">
        {/* Aadhaar Info */}
        <div className="card-header">Aadhaar Information</div>
        <div className="card-body">
          <div className="grid two-cols">
            <div>
              <div className="user-info-subadmin">
                {/* <img
                  className="user-avatar"
                  src={
                    SubadminDetials?.photo
                      ? `data:image/jpeg;base64,${SubadminDetials.photo}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="User"
                /> */}
                <div>
                  <h4 className="user-name">{SubadminDetials?.name}</h4>
                  <p className="user-aadhaar">
                    Aadhaar:{" "}
                    <span className="aadhaar-mask">
                      XXXX-XXXX-{SubadminDetials?.aadhaarNumber?.slice(-4)}
                    </span>
                  </p>
                  <p className="user-phone">Phone: {SubadminDetials.phone}</p>
                  <p className="user-phone">Email: {SubadminDetials.email}</p>
                  <p className="user-phone">
                    sub-Admin Id: {SubadminDetials.subAdminId}
                  </p>
                  <p className="user-phone">Email: {SubadminDetials.email}</p>
                  <p className="user-phone">
                    Date of Birth:{" "}
                    {new Date(SubadminDetials?.dob).toLocaleDateString()}
                  </p>
                </div>
                <div className="subadmin-details">
                  <div className="address">
                    <p>
                      <span className="label-subadmin">performance</span>{" "}
                      <p>
                        Total Tests: {SubadminDetials?.performance?.totalTests}
                      </p>
                      <p>Kits Assigned: {SubadminDetials?.successfulTests}</p>
                      <p>
                        Kit Used: {SubadminDetials?.KitInventory?.failedTests}
                      </p>
                    </p>
                  </div>
                  <div className="address">
                    <p>
                      <span className="label-subadmin">Kit Inventory</span>{" "}
                      <p>
                        Total Tests: {SubadminDetials?.KitInventory?.kitUsed}
                      </p>
                      <p>Kits Assigned: {SubadminDetials?.kitUsed}</p>
                      <p>
                        Kit Used:{" "}
                        {SubadminDetials?.KitInventory?.lifetimekitUsed}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="doc-box">
              <h4 className="doc-title">Uploaded Documents</h4>
              <div className="doc-grid">
                {SubadminDetials?.reports?.length > 0 ? (
                  SubadminDetials?.reports?.map((report, reportIndex) =>
                    report?.testImages?.length > 0 ? (
                      report.testImages.map((img, imgIndex) => (
                        <div
                          className="doc-item"
                          key={`${reportIndex}-${imgIndex}`}
                        >
                          <img
                            src={`data:image/jpeg;base64,${img.imageData}`}
                            alt={img.imageType || `Document ${imgIndex + 1}`}
                          />
                          <p>{img.imageType || `Document ${imgIndex + 1}`}</p>
                        </div>
                      ))
                    ) : (
                      <p key={reportIndex}>
                        No documents uploaded for this report
                      </p>
                    )
                  )
                ) : (
                  <p>No reports available</p>
                )}
              </div>
            </div> */}
          </div>
          <div className="card-header test-data">Test Data</div>
          <div className="card-body"></div>
        </div>

        <div className="card-footer">
          <p className="submitted">Submitted by: {SubadminDetials.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SubadminDetials;
