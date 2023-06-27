import classNames from "classnames";
import React from "react";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { Link, useParams } from "react-router-dom";
import classes from "./ListItem.module.css";
import { useDispatch } from "react-redux";
import { setPage } from "../../../redux/slices/getMailsSlice";

const listItem = [
  {
    icon: <InboxOutlinedIcon className={classes.svg} />,
    pathTo: "/inbox",
    text: "Inbox"
  },
  {
    icon: <SendOutlinedIcon className={classes.svg} />,
    pathTo: "/sent",
    text: "Sent"
  },
  {
    icon: <StarBorderOutlinedIcon className={classes.svg} />,
    pathTo: "/starred",
    text: "Starred"
  },
  {
    icon: <ReportOutlinedIcon className={classes.svg} />,
    pathTo: "/spam",
    text: "Spam"
  },
  {
    icon: <DeleteForeverOutlinedIcon className={classes.svg} />,
    pathTo: "/trash",
    text: "Trash"
  },
]

function ListItems() {
  const path = useParams()['*']
  const dispatch = useDispatch();

  const handleRefreshPage = () => {
    dispatch(setPage(1))
  }
  
  return (
    <div className={classes.listItem}>
      <ul className={classes.ul}>
        {listItem.map((item, idx) => (
          <Link key={idx} className={classes.sidebarContainer} to={item.pathTo} onClick={handleRefreshPage}>
            <li className={classNames(classes.li, { [classes.isSelected]: path.includes(item.text.toLowerCase()) })}>
              {item.icon}{item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
