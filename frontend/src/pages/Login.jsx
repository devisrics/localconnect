import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await loginUser({ email, password });
      login(user, token);
      toast.success("Welcome back! 👋");
      navigate("/services");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="spacer-top"></div>

      <div className="booking-card-wrapper w-100">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="fw-bold mb-1">Login</h2>
          <p className="text-muted small">Access your account</p>
        </div>

        {/* Login Form */}
        <div className="detail-card">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="label-small">Email Address</label>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="name@example.com"
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
              Sign In
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-3">
          <p className="small text-muted mb-0">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary fw-bold text-decoration-none"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      <div className="spacer-bottom"></div>
    </div>
  );
};

export default Login;
