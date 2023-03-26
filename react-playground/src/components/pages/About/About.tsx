import React from 'react';
import './style.css';
import GitHubImage from '../../../assets/github-1.svg';

export class About extends React.Component {
  render() {
    return (
      <>
        <div className="about-container">
          <h1>About</h1>
          <p>Looking for more? Check this out</p>
          <a
            className="about-link"
            href="https://github.com/OKitel"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <img src={GitHubImage} alt="GitHub" />
          </a>
        </div>
      </>
    );
  }
}
