import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {IoIosSearch} from 'react-icons/io'
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
          <IoIosSearch size={25} />
        </button>
      </div>

      <ul className="nav-options">
        <Link to="/">
          <li>
            <button type="button" className="option">
              Popular
            </button>
          </li>
        </Link>
        <Link to="/top-rated">
          <li>
            <button type="button" className="option">
              Top Rated
            </button>
          </li>
        </Link>
        <Link to="/upcoming">
          <li>
            <button type="button" className="option">
              Upcoming
            </button>
          </li>
        </Link>
      </ul>
    </nav>
  )
}
export default Header
