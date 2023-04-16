import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";


function Starred() {
  const [currentPage, setCurrentPage] = useState(1);
  const email = useSelector((state) => state.searchReducer);
  const starredId = useSelector((state) => state.starredReducer);
  const starredData = email.filter((val) => starredId.includes(val.id));

  return (
    <div>
      <Pagination data={starredData} dataLimit={50} currentPage={currentPage} path="/starred" />
    </div>
  );
}

export default Starred;
