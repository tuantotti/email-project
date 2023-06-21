import classNames from "classnames";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToSelected,
  remFromSelected
} from "../../../redux/action/mailSelectAct";
import { deleteMail } from "../../../redux/action/search";
import sendMessageData from "../../../redux/action/showMessage";
import classes from "./Emails.module.css";


function Email({ id, company, description, subject, time, path, email_address, isRead }) {
  const navigate = useNavigate();
  const [showOnHover, setShowOnHover] = useState(false);
  const dispatch = useDispatch();

  const handlingShowOnOver = (e) => {
    e.stopPropagation();
    setShowOnHover(true);
  };

  const handlingShowOnOut = (e) => {
    e.stopPropagation();
    setShowOnHover(false);
  };


  function showMail(e) {
    dispatch(sendMessageData(id, company, description, subject, time, email_address, isRead));
    navigate("/inbox/"+id);
  }

  function handleDelete(e) {
    e.stopPropagation();
    e.preventDefault()
    dispatch(deleteMail(id));
  }

  function selectBox(e) {
    if (e.target.checked) {
      dispatch(addToSelected(id));
    } else {
      dispatch(remFromSelected(id));
    }
  }

  return (
    <React.Fragment>
      <div
        onMouseEnter={handlingShowOnOver}
        onMouseLeave={handlingShowOnOut}
        onMouseOver={handlingShowOnOver}
        className={classNames(classes.list, { [classes.isRead]: isRead })}
        onClick={showMail}
      >
        <div className={classes.check}>
          <input className={classes.chkBox} type="checkbox" onClick={selectBox} />
        </div>
        <div className={classes.company}>
          <div className={classes.mailLineContainer} >
            <h3 className={classes.mailAuthor}>{company}</h3>
            <h3 className={classes.mailTitle}>{description}</h3>
          </div>
          {showOnHover && (
            <div className={classes.hideIcons}>
              <button onClick={handleDelete}  >
                <AiFillDelete className={classes.btnLeft} />
              </button>
            </div>
          )}
          {!showOnHover && (
            <p>{time}</p>
          )}
        </div>
      </div>
      <hr className={classes.hr} />
    </React.Fragment>
  );
}

export default Email;
