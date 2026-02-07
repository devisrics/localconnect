import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMyBookings, cancelBooking } from "../services/bookingService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!user) return;
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancel = (id) => {
    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure you want to cancel this booking?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await cancelBooking(id);
              toast.info("Booking cancelled successfully 🗑️");
              fetchBookings();
            } catch (error) {
              toast.error("Could not cancel booking");
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  if (!user) {
    return (
      <div className="auth-container">
        <div className="spacer-top"></div>
        <div className="booking-card-wrapper text-center">
          <div className="detail-card">
            <h4 className="fw-bold">Access Denied</h4>
            <p className="text-muted small">
              Please login to view your booking history.
            </p>
            <Link to="/login" className="btn-booking d-inline-block px-4">
              Login Now
            </Link>
          </div>
        </div>
        <div className="spacer-bottom"></div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="spacer-top" style={{ flex: 0.1 }}></div>

      <div className="container" style={{ maxWidth: '950px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">My Bookings</h2>
          <p className="text-muted small">
            Track your service requests and schedules
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="booking-card-wrapper text-center">
            <div className="detail-card">
              <p className="text-muted mb-3">Your schedule is empty.</p>
              <Link to="/services" className="btn-booking d-inline-block px-4">
                Find a Pro
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {bookings.map((booking) => (
              <div key={booking._id} className="col-md-6">
                <div className="detail-card h-100 mb-0 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="fw-bold mb-0 text-primary">
                        {booking.service ? booking.service.title : "Service removed"}
                      </h5>
                      <span className={`badge-status ${booking.status}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="label-small">Scheduled Date</label>
                        <p className="value-bold small mb-0">
                          {new Date(booking.bookingDate).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="col-6">
                        <label className="label-small">Status</label>
                        <p className="value-bold small mb-0 text-capitalize">{booking.status}</p>
                      </div>
                    </div>

                    <label className="label-small">Location</label>
                    <p className="text-muted x-small mb-0" style={{ fontSize: '0.8rem' }}>
                      {booking.address}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 border-top d-flex justify-content-end align-items-center">
                    {booking.status?.toLowerCase() === "pending" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-danger btn-sm d-flex align-items-center gap-2 px-3 shadow-sm"
                        style={{
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          backgroundColor: '#dc3545',
                          color: 'white'
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>🗑️</span>
                        Cancel Booking
                      </button>
                    )}
                    {booking.status?.toLowerCase() === "cancelled" && (
                      <span className="text-danger small fw-bold italic">
                        <span className="me-1">🚫</span> Booking Revoked
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="spacer-bottom"></div>
    </div>
  );
};

export default MyBookings;
