import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Header = ({getTheSearchInput}) => {
  const [searchValue, setSearchValue] = useState('')

  const updateSearchInput = event => {
    setSearchValue(event.target.value)
  }

  const submitSearchValue = () => {
    getTheSearchInput(searchValue)
  }

  return (
    <nav className="header">
      <h1 className="logo-heading">movieDB</h1>
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          value={searchValue}
          onChange={updateSearchInput}
          placeholder="Search Movie Name"
        />

        <button
          type="button"
          className="search-btn"
          onClick={submitSearchValue}
        >
          Search
        </button>
      </div>

      <ul className="nav-options">
        <Link to="/">
          <li>
            <h1 className="option">Popular</h1>
          </li>
        </Link>
        <Link to="/top-rated">
          <li>
            <h1 className="option">Top Rated</h1>
          </li>
        </Link>
        <Link to="/upcoming">
          <li>
            <h1 className="option">Upcoming</h1>
          </li>
        </Link>
      </ul>
    </nav>
  )
}
export default Header
