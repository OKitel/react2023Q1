import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

export class Header extends React.Component {
  getClassName({ isActive }: { isActive: boolean }) {
    return isActive ? 'active-link' : '';
  }

  render() {
    return (
      <header className="header">
        <nav className="navBar">
          <NavLink className={this.getClassName} to={'/about'}>
            About us
          </NavLink>
          <NavLink className={this.getClassName} to={'/'}>
            Home Page
          </NavLink>
        </nav>
      </header>
    );
  }
}
