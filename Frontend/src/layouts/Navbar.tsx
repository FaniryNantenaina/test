import React from 'react';
import { Link } from 'react-router-dom';



const Navbar: React.FC = () => {

  return (
    <nav className="mb-4 h-16 bg-gray-800">
      <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, float: 'right', alignItems: 'center', alignContent: 'center', margin: 15 }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/categories"  style={{ textDecoration: 'none', color: 'orange' }}>
            CATEGORIES
          </Link>
        </li>
        <li>
          <Link to="/products"  style={{ textDecoration: 'none', color: 'orange' }}>
            PRODUITS
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
