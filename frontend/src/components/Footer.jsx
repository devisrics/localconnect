const Footer = () => {
  return (
    <footer className="app-footer text-light text-center py-3">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} LocalConnect</p>
        <small>Connecting you with trusted local service providers</small>
      </div>
    </footer>
  );
};

export default Footer;
