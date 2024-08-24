import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <nav>
      <Link to="/" className="nav-button">Home</Link>
    </nav>
  );
};

export default Header;