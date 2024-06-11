import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
// import { setSearchQuery } from '../store/search/searchSlice';
import "../App.css";
import { setSearchQuery } from "../store/Search/searchSlice";

export default function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      history.push(`/search-results/${inputValue}`);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">Movies Point</div>
      <input
        type="text"
        placeholder="Search for movies"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-bar"
      />
    </div>
  );
}
