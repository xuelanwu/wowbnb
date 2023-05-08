import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchFilteredSpots } from "../../../store/spot";

import "./index.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const filterFormRef = useRef();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!filterFormRef.current.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleMinPrice = (e) => {
    const price = e.target.value;
    setMinPrice(() => price);
    if (price) {
      if (isNaN(price)) setErrors(["Must be a number"]);
      else if (price < 1) {
        setErrors(["minPrice must be greater than or equal to 1"]);
      }
    } else setErrors([]);
  };

  const handleMaxPrice = (e) => {
    const price = e.target.value;
    setMaxPrice(price);
    if (price) {
      if (isNaN(price)) setErrors(["Must be a number"]);
      else if (price < 1) {
        setErrors(["maxPrice must be greater than or equal to 1"]);
      }
    } else setErrors([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (minPrice && maxPrice) {
      if (parseInt(minPrice) > parseInt(maxPrice)) {
        return setErrors(["minPrince cannot be greater than maxPrice"]);
      }
    }
    if (errors.length > 0) return;
    return dispatch(
      fetchFilteredSpots({ minPrice, maxPrice, city, state, country })
    ).then(() => setShowMenu(false));
  };

  return (
    <div className="nav-block-filter">
      <li className="nav-items search-field">
        <div className="search-container">
          <button className="search-button" onClick={openMenu}>
            Anywhere
          </button>
          <button className="search-button" onClick={openMenu}>
            Any price
          </button>
          <button className="search-button" onClick={openMenu}>
            Search
          </button>
          <button className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </li>
      {showMenu && (
        <form className="filter-form" ref={filterFormRef}>
          <div className="filter-form-block">
            <ul className="filter-error">
              {errors.map((error, idx) => (
                <li key={`filterError-${idx + 1}`}>{error}</li>
              ))}
            </ul>
          </div>
          <div className="filter-form-block">
            <div className="filter-keyword-box">
              <label htmlFor="city">City</label>
              <div className="filter-keyword-input-box">
                <input
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  maxLength={25}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block">
            <div className="filter-keyword-box">
              <label htmlFor="state">State</label>
              <div className="filter-keyword-input-box">
                <input
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  maxLength={25}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block">
            <div className="filter-keyword-box">
              <label htmlFor="country">Country</label>
              <div className="filter-keyword-input-box">
                <input
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  maxLength={25}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block">
            <div className="filter-price-box">
              <label htmlFor="minPrice">min price</label>
              <div className="filter-price-input-box">
                <span>$</span>
                <input
                  name="minPrice"
                  value={minPrice}
                  onChange={handleMinPrice}
                  maxLength={5}
                />
              </div>
            </div>
            <span>-</span>
            <div className="filter-price-box">
              <label htmlFor="maxPrice">max price</label>
              <div className="filter-price-input-box">
                <span>$</span>
                <input
                  name="maxPrice"
                  value={maxPrice}
                  onChange={handleMaxPrice}
                  maxLength={5}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block filter-search-button-div">
            <button
              type="submit"
              onClick={handleSearch}
              value="search"
              className="spot-filter-search-button"
            >
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
