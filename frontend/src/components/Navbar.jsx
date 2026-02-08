import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "nav-link-active" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-dark-professional sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link className="brand-logo" to="/">
          Local<span>Connect</span>
        </Link>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link-pro ${isActive("/")}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link-pro ${isActive("/services")}`} to="/services">
                Services
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link-pro ${isActive("/mybookings")}`}
                    to="/mybookings"
                  >
                    My Bookings
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
                  <div className="user-avatar-circle me-2">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <button className="btn-logout-pro" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link-pro ${isActive("/login")}`} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn-join-pro" to="/register">
                    Join Now
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
