import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="auth-container">
      <div className="spacer-top"></div>

      <div className="container">
        {/* HERO CARD */}
        <div className="card border-0 text-center shadow-lg mb-4" style={{ borderRadius: '24px' }}>
          <div className="card-body py-5 px-4">
            <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
              Welcome to LocalConnect
            </h1>
            <p className="text-muted mb-4 lead">
              Connecting you with verified professionals for every home, office, and personal requirement.
            </p>
            <Link to="/services" className="btn-booking d-inline-block px-5 py-3">
              Explore All Services
            </Link>
          </div>
        </div>

        {/* FEATURES */}
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm py-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">🔧 Skilled Professionals</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Access a curated network of experts including certified electricians, plumbers, 
                  home tutors, and IT technicians. Every provider undergoes a rigorous verification process to ensure quality and safety.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm py-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">📅 Seamless Easy Booking</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Skip the long phone calls. Browse available time slots and book your 
                  required service in under 60 seconds. Receive instant confirmation and real-time updates.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm py-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">⭐ Verified Trusted Ratings</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Make informed decisions using our transparent review system. Compare providers based on experience, customer feedback, and performance ratings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="spacer-bottom"></div>
    </div>
  );
};

export default Home;
