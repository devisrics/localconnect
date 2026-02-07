import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceById } from "../services/serviceService";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    getServiceById(id).then(setService);
  }, [id]);

  if (!service)
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="page-bg">
      <div className="container pt-5 pb-5">
        <div className="row g-4">

          {/* Main Content */}
          <div className="col-lg-8">
            <div className="detail-card shadow-sm mb-4">
              <span className="badge bg-primary mb-2">{service.category}</span>

              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="fw-bold mb-1">{service.title}</h1>
                  <p className="text-muted small">
                    {service.location} • ⭐ {service.rating} ({service.completedJobs} jobs)
                  </p>
                </div>
                <div className="text-end">
                  <h2 className="text-primary fw-bold mb-0">₹{service.price}</h2>
                  <small className="text-muted">Estimated Cost</small>
                </div>
              </div>

              {/* Info Row */}
              <div className="info-row mb-3">
                <div className="info-column">
                  <span className="label-small">Provider</span>
                  <span className="value-bold">{service.providerName || "Ravi"}</span>
                </div>
                <div className="info-column">
                  <span className="label-small">Experience</span>
                  <span className="value-bold">{service.experience || "8 years"}</span>
                </div>
                <div className="info-column">
                  <span className="label-small">Availability</span>
                  <span className="value-bold text-success">{service.availability || "9 AM - 7 PM"}</span>
                </div>
              </div>

              <div className="detail-card shadow-sm">
                <h5 className="fw-bold mb-3">About this service</h5>
                <p className="text-secondary" style={{ lineHeight: "1.7" }}>
                  {service.description ||
                    "Detailed home wiring, switch replacement, and electrical repairs conducted by certified professionals."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="detail-card shadow-sm text-center py-4">
              <h4 className="mb-3">Ready to start?</h4>
              <p className="small text-muted mb-4 px-3">
                Secure your slot now. Our experts will contact you for specific requirements.
              </p>
              <Link
                to={`/book/${service._id}`}
                className="btn-booking text-decoration-none"
              >
                Book This Service
              </Link>
              <div className="mt-3">
                <Link
                  to="/services"
                  className="btn btn-link text-decoration-none text-muted small"
                >
                  Back to Services
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
