import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './style.css';

export const Header: React.FC = () => {
  const location = useLocation();

  const getClassName = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'active-link' : '';
  };

  const getTitleName = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';

      case '/about':
        return 'About us';

      case '/form':
        return 'Form';

      default:
        return '404';
    }
  };

  return (
    <header className="header">
      <h1 className="page-title">{getTitleName()}</h1>
      <nav className="navBar">
        <NavLink className={getClassName} to={'/about'}>
          About us
        </NavLink>
        <NavLink className={getClassName} to={'/'}>
          Home Page
        </NavLink>
        <NavLink className={getClassName} to={'/form'}>
          Form
        </NavLink>
      </nav>
    </header>
  );
};
