import React from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

function SendMail() {
  const sentData = useSelector((state) => state.sentReducer);
  return (
    <Pagination />
  );
}

export default SendMail;
