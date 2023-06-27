import React from "react";
import classes from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import search from "../../../assets/img/search.png";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const gatherSearchData = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  const handlingSearch = (e) => {
    e.preventDefault();
    if (searchText.length === 0) {
    } else {
    }
  };
  return (
    <form onSubmit={handlingSearch} className={classes.form}>
      <div className={classes.search}>
        <img className={classes.searchIcon} src={search} alt="search" />
        <input
          value={searchText}
          onChange={gatherSearchData}
          className={classes.input}
          type="text"
          placeholder="Tìm kiếm trong thư"
        />
      </div>
    </form>
  );
}

export default SearchBar;
