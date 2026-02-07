import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await registerUser({ name, email, password });
      login(user, token);
      toast.success("Account created successfully! 🎉");
      navigate("/services");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="spacer-top"></div>

      <div className="booking-card-wrapper w-100">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="fw-bold mb-1">Join Us</h2>
          <p className="text-muted small">Create your account to start booking</p>
        </div>

        {/* Registration Form */}
        <div className="detail-card">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="label-small">Full Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <label className="label-small">Email Address</label>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="email@site.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="label-small">Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-booking w-100">
              Create Account
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-3">
          <p className="small text-muted mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary fw-bold text-decoration-none"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="spacer-bottom"></div>
    </div>
  );
};

export default Register;
