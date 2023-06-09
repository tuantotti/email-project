import classNames from "classnames";
import React, { useRef, useState } from "react";
import moment from "moment"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { Rating } from '@mui/material';
import classes from "./Emails.module.css";
import IconArchive from "../../../assets/img/icon_archive.png"
import IconImage from "../../../assets/img/icon_image.png"
import IconPdf from "../../../assets/img/icon_pdf.png"
import IconScript from "../../../assets/img/icon_script.png"
import IconText from "../../../assets/img/icon_text.png"
import IconVideo from "../../../assets/img/icon_video.png"
import IconOctetStream from "../../../assets/img/icon_octet-stream.png"
import { getMailsThunk, handleChildCheckboxChange } from "../../../redux/slices/getMailsSlice";
import { changeMailStatusThunk } from "../../../redux/slices/changeMailStatusSlice";
import { setMailDetail } from "../../../redux/slices/viewMailSlice";

function Email({ index, id, subject, body, fromAddress, fromName, toAddress, toName, ccAddress, bccAddress, sendDate, receivedDate, receiverStatus, senderStatus, fileDataList, isRead }) {
  const statusPath = useParams()['*'].toUpperCase();
  const navigate = useNavigate();
  const checkBoxRef = useRef();
  const dispatch = useDispatch();
  const { childChecked, page, size, } = useSelector((state) => state.getMailsSlice);
  const { user } = useSelector(state => state.userInfoSlice)
  const path = useParams()['*']
  const [showOnHover, setShowOnHover] = useState(false);
  const [starred, setStarred] = useState(() => {
    if (statusPath === 'INBOX') {
      return receiverStatus?.includes("STARRED") && 1
    } else if (statusPath === 'SENT') {
      return senderStatus?.includes("STARRED") && 1
    } else if (statusPath === 'STARRED') {
      return (receiverStatus?.includes("STARRED") && 1) || (senderStatus?.includes("STARRED") && 1)
    }
  })

  const handlingShowOnOver = (e) => {
    e.stopPropagation();
    setShowOnHover(true);
  };

  const handlingShowOnOut = (e) => {
    e.stopPropagation();
    setShowOnHover(false);
  };


  function showMail(e) {
    if (!e.target.classList.contains('check')) {
      const mailDetail = { id, subject, body, fromAddress, fromName, toAddress, ccAddress, bccAddress, sendDate, receivedDate, receiverStatus, fileDataList, isRead }
      navigate(`/${path}/` + id);
      dispatch(setMailDetail(mailDetail))
    }
  }

  function handleSelectMail(e) {
    dispatch(handleChildCheckboxChange({ index, isChecked: e.target.checked }))
  }

  function handleFileType(name) {
    const extension = name.split('.').pop().toLowerCase();

    if (extension === 'pdf') {
      return IconPdf;
    } else if (['txt', 'doc', 'docx', 'csv'].includes(extension)) {
      return IconText;
    } else if (['zip', 'rar'].includes(extension)) {
      return IconArchive;
    } else if (['js', 'py', 'sh', 'sql'].includes(extension)) {
      return IconScript;
    } else if (extension.match(/^(jpg|jpeg|png|gif)$/)) {
      return IconImage;
    } else if (['mp4', 'mov', 'avi', 'mkv'].includes(extension)) {
      return IconVideo;
    } else {
      return IconOctetStream;
    }
  }

  const handleTime = (time) => {
    const currentTime = moment();
    let formattedTime;

    if (moment(time).isSame(currentTime, 'day')) {
      formattedTime = moment(time).format('h:mm A');
    } else if (currentTime.year() === moment(time).year()) {
      formattedTime = moment(time).format('MMM D');
    } else {
      formattedTime = moment(time).format('D/M/YYYY');
    }

    return formattedTime;

  }

  const checkName = () => {
    return fromAddress === user.email ? `To: ${toName}` : fromName
  }

  function handleStarMail(mailId, newValue) {
    const checkOriginalStatus = () => {
      if (receiverStatus === "STARRED") {
        return "INBOX"
      } else if (senderStatus === "STARRED") {
        return "SENT"
      }
    }
    setStarred(newValue)
    dispatch(changeMailStatusThunk({ id: mailId, status: newValue ? "STARRED" : checkOriginalStatus() })).then(res => {
      dispatch(getMailsThunk({ status: statusPath, page, size }))
    })
  }

  function handleDelete(e, mailId) {
    e.stopPropagation();
    e.preventDefault();
    dispatch(changeMailStatusThunk({ id: mailId, status: statusPath === "TRASH" ? "DELETED" : "TRASH" })).then(res => {
      dispatch(getMailsThunk({ status: statusPath, page, size }))
    })
  }

  return (
    <React.Fragment>
      <div
        onMouseEnter={handlingShowOnOver}
        onMouseLeave={handlingShowOnOut}
        onMouseOver={handlingShowOnOver}
        className={classNames(classes.list, { [classes.isRead]: isRead || statusPath === "SENT", [classes.containFile]: fileDataList.length, [classes.flexStart]: fileDataList.length })}
      >
        <div className={classes.check} style={fileDataList.length ? {} : { marginTop: 0 }}>
          <Checkbox
            ref={checkBoxRef}
            onChange={handleSelectMail}
            checked={childChecked[index]}
          />
          {(statusPath !== "TRASH" && statusPath !== "SPAM") && <Rating
            className={classes.starred}
            max={1}
            value={starred}
            onChange={(event, newValue) => handleStarMail(id, newValue)}
          />}
        </div>
        <div
          onClick={showMail}
          className={classes.company} >
          <div className={classNames(classes.mailLineContainer, { [classes.flexStart]: fileDataList.length })} >
            <h3 className={classNames(classes.mailAuthor, { [classes.fontWeightLight]: isRead || statusPath === "SENT" })}>{checkName()}</h3>
            <div className={classes.groupContainFile}>
              <div className={classes.flexItem}>
                <h3 className={classNames(classes.mailTitle, { [classes.fontWeightLight]: isRead || statusPath === "SENT" })}>{subject}</h3>
                {!showOnHover && (
                  <p className={classNames(classes.mailTime, { [classes.fontWeightLight]: isRead || statusPath === "SENT" })}>{handleTime(sendDate)}</p>
                )}
              </div>

              {fileDataList.length ? <div className={classes.fileGroup}>
                {fileDataList.map((item, idx) => {
                  if (idx <= 2) {
                    return (<div className={classes.fileItem}>
                      <img src={handleFileType(item.name)} className={classes.fileIcon} />
                      <span className={classes.fileName}>{item.name}</span>
                    </div>)
                  }
                })}
                {fileDataList.length > 3 ? <div className={classNames(classes.fileItem, classes.fileOthers)}>
                  <span className={classes.fileName}>+{fileDataList.length - 3}</span>
                </div> : <></>}
              </div> : <></>}
            </div>
            {showOnHover && (
              <div className={classes.hideIcons}>
                <button onClick={(e) => handleDelete(e, id)}  >
                  <DeleteOutlinedIcon className={classes.btnLeft} />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      <hr className={classes.hr} />
    </React.Fragment>
  );
}

export default Email;
