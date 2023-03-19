import React from 'react';
import './style.css';

export class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1 className="not-found-title">404</h1>
        <h2>Sorry! The page you are looking for could not be found...</h2>
      </div>
    );
  }
}
