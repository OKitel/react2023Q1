import { SearchBar } from '../SearchBar/SearchBar';
import React from 'react';
import './style.css';

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>HOME</h1>
        <SearchBar />
      </div>
    );
  }
}
