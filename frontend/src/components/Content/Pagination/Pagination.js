import React, { useEffect, useState } from "react";
import Email from "../Emails/Email";
import classes from "./Pagination.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getMailsThunk } from "../../../redux/slices/getMailsSlice"
import { useParams } from "react-router-dom";

function Pagination({ data, dataLimit, currentPage, path }) {
  const dispatch = useDispatch();
  const { mails, page, size, totalPages } = useSelector((state) => state.getMailsSlice);
  const status = useParams()['*'].toUpperCase();

  useEffect(() => {
    dispatch(getMailsThunk({ status, page, size }))
  }, [])

  return (
    <div className={classes.Pagination}>
      {mails.map((d, i) => {
        return (
          <Email
            index={i}
            key={d.id}
            id={d.id}
            company={d.company_Name}
            description={d.description}
            subject={d.subject}
            time={d.time}
            email_address={d.email_address}
            isRead={d.isRead}
            isStarred={d.isStarred}
            path={path}
          />
        );
      })}
    </div>
  );
}

export default Pagination;
