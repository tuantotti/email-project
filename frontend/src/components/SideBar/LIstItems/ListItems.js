import React from "react";
import classes from "./ListItem.module.css";
import { Link } from "react-router-dom";
import { GrStar } from "react-icons/gr";
import { BiAlarmSnooze, BiSend } from "react-icons/bi";
import { RiDraftLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";


function ListItems() {

  return (
    <div className={classes.listItem}>
      <ul className={classes.ul}>

        <Link className={classes.sidebarContainer} to="/inbox">
          <li className={classes.li}>
            <HiOutlineMail className={classes.svg} />Hộp thư đến
          </li>
        </Link>

        <Link className={classes.sidebarContainer} to="/sent">
          <li className={classes.li}>
            <BiSend className={classes.svg} />Đã gửi
          </li>
        </Link>

        <Link className={classes.sidebarContainer} to="/starred">
          <li className={classes.li}>
            <GrStar className={classes.svg} />Starred
          </li>
        </Link>

        <Link className={classes.sidebarContainer} to="/snoozed">
          <li className={classes.li}>
            <BiAlarmSnooze className={classes.svg} />Snoozed
          </li>
        </Link>

        <Link className={classes.sidebarContainer} to="/drafts">
          <li className={classes.li}>
            <RiDraftLine className={classes.svg} /> Drafts
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default ListItems;
