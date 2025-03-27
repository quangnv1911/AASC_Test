import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [domain, setDomain] = useState('vinhquang.bitrix24.vn');
  const {  initiateOAuth } = useAuth();
  
  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const handleOAuthLogin = () => {
    if (domain.trim()) {
      initiateOAuth(domain);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Bitrix24</h2>
        
        <div className="login-option">
          <h3>OAuth Login</h3>
          <p>Connect to your Bitrix24 account:</p>
          <div className="form-group">
            <label htmlFor="domain">Bitrix24 Domain:</label>
            <input
              type="text"
              id="domain"
              disabled
              value={domain}
              onChange={handleDomainChange}
              placeholder="your-domain.bitrix24.com"
            />
          </div>
          <button 
            onClick={handleOAuthLogin} 
            className="oauth-button"
            disabled={!domain.trim()}
          >
            Install/Reinstall
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;