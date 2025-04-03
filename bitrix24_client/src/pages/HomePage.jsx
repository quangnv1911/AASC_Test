import { Link } from 'react-router-dom';
import { FaUserFriends, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header text-center">
          <h1 className="page-title">Welcome to Bitrix24 Connect</h1>
          <p className="page-description mb-5">
            Manage your contacts and business relationships efficiently with our Bitrix24 integration.
          </p>
        </div>

        <div className="d-flex justify-content-center">
          <div className="card" style={{ maxWidth: '600px' }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div style={{ 
                backgroundColor: 'rgba(67, 97, 238, 0.1)', 
                borderRadius: '50%', 
                width: '60px', 
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-color)',
                fontSize: '1.5rem'
              }}>
                <FaUserFriends />
              </div>
              <div>
                <h2 className="fs-xl fw-bold">Contact Management</h2>
                <p className="text-muted">Create, view, update, and delete contacts</p>
              </div>
            </div>
            
            <p className="mb-4">
              Nguyen Vinh Quang Test
            </p>
            
            <Link to="/contacts" className="btn d-flex align-items-center">
              <span>Go to Contacts</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;