import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface State {
  searchValue: string;
}
export class SearchBar extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    const savedState = localStorage.getItem('searchState');
    if (savedState) {
      this.state = JSON.parse(savedState);
    } else {
      this.state = {
        searchValue: '',
      };
    }
  }

  componentWillUnmount(): void {
    localStorage.setItem('searchState', JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="search">
        <label htmlFor="search">
          <FontAwesomeIcon className="searchIcon" icon={faSearch} />
          <input
            className="searchInput"
            id="search"
            type="text"
            placeholder="Type here..."
            value={this.state.searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              this.setState({ searchValue: event.target.value });
            }}
          />
        </label>
        <input className="searchBtn" type="submit" value="Search" />
      </div>
    );
  }
}
