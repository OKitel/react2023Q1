import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

export class Header extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
    this.state = { text: location.pathname };
    this.saveLocation = this.saveLocation.bind(this);
  }

  getClassName({ isActive }: { isActive: boolean }) {
    return isActive ? 'active-link' : '';
  }

  getTitleName() {
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
  }

  saveLocation() {
    this.setState({ text: location.pathname });
  }

  render() {
    return (
      <header className="header">
        <h1 className="page-title">{this.getTitleName()}</h1>
        <nav className="navBar">
          <NavLink className={this.getClassName} onClick={this.saveLocation} to={'/about'}>
            About us
          </NavLink>
          <NavLink className={this.getClassName} onClick={this.saveLocation} to={'/'}>
            Home Page
          </NavLink>
          <NavLink className={this.getClassName} onClick={this.saveLocation} to={'/form'}>
            Form
          </NavLink>
        </nav>
      </header>
    );
  }
}
