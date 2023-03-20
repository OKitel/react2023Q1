import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

type Props = {
  title: string;
};

export class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  getClassName({ isActive }: { isActive: boolean }) {
    return isActive ? 'active-link' : '';
  }

  render() {
    return (
      <header className="header">
        <h1 className="page-title">{this.props.title}</h1>
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
