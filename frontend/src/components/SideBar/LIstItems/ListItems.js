import classNames from "classnames";
import React, { useState } from "react";
import { BiAlarmSnooze, BiSend } from "react-icons/bi";
import { GrStar } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { RiDraftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import classes from "./ListItem.module.css";

const listItem = [
  {
    icon: <HiOutlineMail className={classes.svg} />,
    pathTo: "/inbox",
    text: "Hộp thư đến"
  },
  {
    icon: <BiSend className={classes.svg} />,
    pathTo: "/sent",
    text: "Đã gửi"
  },
  {
    icon: <GrStar className={classes.svg} />,
    pathTo: "/starred",
    text: "Starred"
  },
  {
    icon: <BiAlarmSnooze className={classes.svg} />,
    pathTo: "/snoozed",
    text: "Snoozed"
  },
  {
    icon: <RiDraftLine className={classes.svg} />,
    pathTo: "/drafts",
    text: "Drafts"
  }
]

function ListItems() {
  const [indexSelected, setIndexSelected] = useState(0);

  return (
    <div className={classes.listItem}>
      <ul className={classes.ul}>
        {listItem.map((item, idx) => (
          <Link key={idx} className={classes.sidebarContainer} to={item.pathTo} onClick={() => setIndexSelected(idx)}>
            <li className={classNames(classes.li, {[classes.isSelected]: idx === indexSelected})}>
              {item.icon}{item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
