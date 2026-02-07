import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { getAllServices } from "../services/serviceService";

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 3;

  const [search, setSearch] = useState("");         // Search input
  const [category, setCategory] = useState("All");  // Category filter

  // Fetch all services from backend
  useEffect(() => {
    const fetchServices = async () => {
      const data = await getAllServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || service.category === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container my-5">
      {/* Page Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Available Services</h2>
        <p className="text-muted">Find the right expert for your task today</p>
      </div>

      {/* Search and Category Filter */}
      <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
          className="form-control w-auto"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1); // reset page on category change
          }}
          className="form-select w-auto"
        >
          <option value="All">All Categories</option>
          <option value="IT Services">IT Services</option>
          <option value="Wood Work">Wood Work</option>
          <option value="Home Services">Home Services</option>
          <option value="Appliances">Appliances</option>
          <option value="Education">Education</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
        </select>
      </div>

      {/* Services Grid */}
      <div className="row g-4">
        {currentServices.length > 0 ? (
          currentServices.map((service) => (
            <div className="col-lg-4 col-md-6" key={service._id}>
              <ServiceCard service={service} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No services found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">
          <button
            className="btn btn-outline-primary"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-primary"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
