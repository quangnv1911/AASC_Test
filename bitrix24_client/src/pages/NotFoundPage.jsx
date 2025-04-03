import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <div className="text-center">
            <FaExclamationTriangle style={{ fontSize: '4rem', color: 'var(--warning-color)' }} />
            <h1 className="page-title mt-3">404 - Page Not Found</h1>
            <p className="page-description mb-4">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn">
              <FaHome />
              <span>Go to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;