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
import { handleChildCheckboxChange } from "../../../redux/slices/getMailsSlice";

function Email({ index, id, company, description, subject, time, email_address, isRead, isStarred }) {
  const navigate = useNavigate();
  const checkBoxRef = useRef();
  const dispatch = useDispatch();
  const { childChecked } = useSelector((state) => state.getMailsSlice);
  const path = useParams()['*']
  const [showOnHover, setShowOnHover] = useState(false);
  const [starred, setStarred] = useState(() => isStarred && 1)
  const listFile = [
    // { name: 'report.txt' },
    // { name: 'Cambridge Ielts 11.zip' },
    // { name: 'Cambridge Ielts 17.pdf' },
    // { name: 'Speaking Part II.mp4' },
    // { name: 'abcdefghbcaed.png' },
  ];

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
      navigate(`/${path}/` + id);
    }
  }

  function handleDelete(e) {
    e.stopPropagation();
    e.preventDefault()
  }

  function handleSelectMail(e) {
    dispatch(handleChildCheckboxChange({ index, isChecked: e.target.checked }))
    // e.stopPropagation();
    // e.preventDefault();
    if (e.target.checked) {
      //   dispatch(addToSelected(id));
    } else {
      //   dispatch(remFromSelected(id));
    }
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
      return null;
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

  return (
    <React.Fragment>
      <div
        onMouseEnter={handlingShowOnOver}
        onMouseLeave={handlingShowOnOut}
        onMouseOver={handlingShowOnOver}
        className={classNames(classes.list, { [classes.isRead]: isRead, [classes.containFile]: listFile.length, [classes.flexStart]: listFile.length })}
      >
        <div className={classes.check}>
          <Checkbox
            ref={checkBoxRef}
            onChange={handleSelectMail}
            checked={childChecked[index]}
          />
          <Rating
            className={classes.starred}
            max={1}
            value={starred}
            onChange={(event, newValue) => setStarred(newValue)}
          />
        </div>
        <div
          onClick={showMail}
          className={classes.company} >
          <div className={classNames(classes.mailLineContainer, { [classes.flexStart]: listFile.length })} >
            <h3 className={classNames(classes.mailAuthor, { [classes.fontWeightLight]: isRead })}>{company}</h3>
            <div className={classes.groupContainFile}>
              <div className={classes.flexItem}>
                <h3 className={classNames(classes.mailTitle, { [classes.fontWeightLight]: isRead })}>{description}</h3>
                {!showOnHover && (
                  <p className={classNames(classes.mailTime, { [classes.fontWeightLight]: isRead })}>{handleTime(time)}</p>
                )}
              </div>

              {listFile.length ? <div className={classes.fileGroup}>
                {listFile.map((item, idx) => {
                  if (idx <= 2) {
                    return (<div className={classes.fileItem}>
                      <img src={handleFileType(item.name)} className={classes.fileIcon} />
                      <span className={classes.fileName}>{item.name}</span>
                    </div>)
                  }
                })}
                {listFile.length > 3 ? <div className={classNames(classes.fileItem, classes.fileOthers)}>
                  <span className={classes.fileName}>+{listFile.length - 3}</span>
                </div> : <></>}
              </div> : <></>}
            </div>
            {showOnHover && (
              <div className={classes.hideIcons}>
                <button onClick={handleDelete}  >
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
