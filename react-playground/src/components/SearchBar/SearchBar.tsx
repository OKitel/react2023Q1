import React, { useState, KeyboardEvent } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setQuery } from '../../redux/reducers';

export const SearchBar = () => {
  const { query } = useAppSelector((state) => state.photos);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>(query);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearchBtnClick();
    }
  };

  const onSearchBtnClick = () => {
    dispatch(setQuery(searchValue));
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
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setSearchValue(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </label>
      <input className="searchBtn" type="submit" value="Search" onClick={onSearchBtnClick} />
    </div>
  );
};
