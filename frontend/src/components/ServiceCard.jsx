import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="card h-100 shadow-sm service-card">
      <div className="card-body d-flex flex-column p-4">
        {/* Category as a Badge */}
        <span className="category-badge align-self-start">{service.category}</span>

        {/* Service Title */}
        <h5 className="card-title fw-bold mb-2">{service.title}</h5>

        {/* Price */}
        <p className="price-tag mb-1 text-primary">₹{service.price}</p>

        {/* Location */}
        <p className="location-text mb-4">📍 {service.location}</p>

        {/* View Details Button */}
        <Link
          to={`/services/${service._id}`}
          className="mt-auto btn btn-outline-primary fw-bold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
