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
      <hr className={classes.hr} />
      {mails.map((d, i) => {
        return (
          <Email
            index={i}
            key={d.id}
            id={d.id}
            subject={d.subject}
            body={d.body}
            fromAddress={d.fromAddress}
            fromName={d.fromName}
            toAddress={d.toAddress}
            ccAddress={d.ccAddress}
            bccAddress={d.bccAddress}
            sendDate={d.sendDate}
            receivedDate={d.receivedDate}
            status={d.status}
            fileDataList={d.fileDataList}
            isRead={d.isRead}
            isStarred={d.isStarred}
          />
        );
      })}
    </div>
  );
}

export default Pagination;
