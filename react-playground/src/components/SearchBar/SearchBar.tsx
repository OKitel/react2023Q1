import React, { useEffect, useState, useRef, KeyboardEvent } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface State {
  searchValue: string;
}

type Props = {
  onSubmit: (value: string) => void;
};

export const SearchBar = (props: Props) => {
  const refInput: React.RefObject<HTMLInputElement> = useRef(null);

  const savedState = localStorage.getItem('searchValue');

  const initialValue = {
    searchValue: savedState ? JSON.parse(savedState) : '',
  };

  const [state, setState] = useState<State>(initialValue);

  useEffect(() => {
    const current = refInput.current;
    return () => {
      localStorage.setItem('searchValue', JSON.stringify(current?.value ?? ''));
    };
  }, [refInput]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      props.onSubmit(state.searchValue);
    }
  };

  return (
    <div className="search">
      <label htmlFor="search">
        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
        <input
          className="searchInput"
          id="search"
          type="text"
          placeholder="Type here..."
          value={state.searchValue}
          ref={refInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setState({ searchValue: event.target.value });
          }}
          onKeyDown={handleKeyDown}
        />
      </label>
      <input
        className="searchBtn"
        type="submit"
        value="Search"
        onClick={() => props.onSubmit(state.searchValue)}
      />
    </div>
  );
};
