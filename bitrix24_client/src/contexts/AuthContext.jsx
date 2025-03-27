import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { envConfig } from '../config/env';

// Create the auth context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState(localStorage.getItem('member_id'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('member_id'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have a member ID in localStorage
    const storedMemberId = localStorage.getItem('member_id');
    setMemberId(storedMemberId);
    setIsAuthenticated(!!storedMemberId);
    setLoading(false);
  }, []);

  const login = (memberId, token) => {
    localStorage.setItem('member_id', memberId);
    localStorage.setItem('token', token);
    setMemberId(memberId);
    setIsAuthenticated(true);
    navigate('/contacts')
  };

  const logout = () => {
    localStorage.removeItem('member_id');
    setMemberId(null);
    setIsAuthenticated(false);
  };
  const initiateOAuth = (domain) => {
    const authUrl = `${envConfig.BE_URL}/api/install?domain=${domain}`;
    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
  
    const authPopup = window.open(
      authUrl,
      "BitrixAuth",
      `width=${width},height=${height},top=${top},left=${left}`
    );
    const handleAuthMessage = (event) => {
      if (!event.data.token || !event.data.member_id) return;
  
      login(event.data.member_id, event.data.token);
      
      authPopup?.close();
      window.removeEventListener("message", handleAuthMessage);
    };
  
    window.addEventListener("message", handleAuthMessage);
  
    // handle close popup
    const popupCheckInterval = setInterval(() => {
      if (!authPopup || authPopup.closed) {
        clearInterval(popupCheckInterval);
        window.removeEventListener("message", handleAuthMessage);
        if (!localStorage.getItem("token")) {
          alert("Login fail, please try again");
        }
      }
    }, 1000);
  };
  
  return (
    <AuthContext.Provider
      value={{
        memberId,
        isAuthenticated,
        loading,
        login,
        logout,
        initiateOAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;