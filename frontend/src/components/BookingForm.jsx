import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { toast } from "react-toastify";

const BookingForm = ({ serviceId }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createBooking({
        serviceId,
        bookingDate,
        address,
      });

      toast.success("Service booked successfully!");
      navigate("/mybookings");
    } catch (error) {
      toast.error("Booking failed. Please login.");
    }
  };

  return (
    <div className="card booking-card p-4">
      <h4 className="fw-bold mb-4">Schedule Your Service</h4>

      <form onSubmit={submitHandler}>
        {/* Preferred Date */}
        <div className="mb-3">
          <label className="form-label text-uppercase small tracking-wider">
            Preferred Date
          </label>
          <input
            type="date"
            className="form-control"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>

        {/* Service Address */}
        <div className="mb-4">
          <label className="form-label text-uppercase small tracking-wider">
            Service Address
          </label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter full address where service is required..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success shadow-sm">
          Confirm & Book Appointment
        </button>

        <p className="text-center text-muted small mt-3">
          <i className="bi bi-shield-check"></i> Secure booking powered by LocalConnect
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
