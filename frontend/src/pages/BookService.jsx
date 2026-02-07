import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceById } from "../services/serviceService";
import { createBooking } from "../services/bookingService";
import { toast } from "react-toastify";

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [address, setAddress] = useState("");

  // Fetch service details on mount
  useEffect(() => {
    getServiceById(id).then(setService);
  }, [id]);

  // Handle booking submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createBooking({ serviceId: id, bookingDate, address });
      toast.success("Booking stored successfully");
      navigate("/mybookings");
    } catch (err) {
      toast.error("Booking failed. Please login.");
      navigate("/login");
    }
  };

  // Loading state
  if (!service) {
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="page-bg min-vh-100 py-5">
      <div className="container">
        {/* Constrained wrapper */}
        <div className="booking-card-wrapper mx-auto">
          <h2 className="fw-bold mb-4 text-center">Confirm Your Booking</h2>

          {/* Service Summary */}
          <div className="detail-card shadow-sm mb-4">
            <span className="form-header-badge">Service Summary</span>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-bold mb-1">{service.title}</h4>
                <p className="text-muted small mb-0">
                  {service.category} • {service.location}
                </p>
              </div>
              <div className="text-end">
                <span className="h4 fw-bold text-primary">₹{service.price}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="detail-card shadow-sm">
            <form onSubmit={submitHandler}>
              {/* Appointment Date */}
              <div className="mb-4">
                <label className="label-small mb-2">Select Appointment Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>

              {/* Service Address */}
              <div className="mb-4">
                <label className="label-small mb-2">Service Address</label>
                <textarea
                  className="form-control form-control-sm"
                  rows="3"
                  placeholder="Enter the full address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center border-top pt-4">
                <button type="submit" className="btn-booking w-100">
                  Confirm & Book Now
                </button>
                <p className="text-muted small mt-3 mb-0">
                  By clicking confirm, you agree to our terms.
                </p>
              </div>
            </form>
          </div>

          {/* Back Button */}
          <div className="text-center mt-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-link text-muted text-decoration-none small"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
