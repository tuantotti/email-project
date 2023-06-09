import React, { useEffect, useState } from "react";
import Email from "../Emails/Email";
import classes from "./Pagination.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getMailsThunk } from "../../../redux/slices/getMailsSlice"
import { useParams } from "react-router-dom";

function Pagination() {
  const dispatch = useDispatch();
  const { mails, page, size } = useSelector((state) => state.getMailsSlice);
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
            toName={d.toName}
            ccAddress={d.ccAddress}
            bccAddress={d.bccAddress}
            sendDate={d.sendDate}
            receivedDate={d.receivedDate}
            receiverStatus={d.receiverStatus}
            senderStatus={d.senderStatus}
            fileDataList={d.fileDataList}
            isRead={d.isRead}
            isStarred={d.isStarred}
          />
        );
      })}
      {!mails.length ? <div className={classes.noEmail}>
        <span className="signup-subtext-password-condition" style={{fontSize: 20}}>No email here!</span>  
      </div> : <></>}
    </div>
  );
}

export default Pagination;
