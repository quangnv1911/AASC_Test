import { NavLink } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <FaBuilding />
          <span>Bitrix24 Connect</span>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/contacts" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contacts
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;