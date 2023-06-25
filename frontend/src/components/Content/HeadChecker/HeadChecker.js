import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import Checkbox from '@mui/material/Checkbox';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import more from "../../../assets/img/more.png";
import refresh from "../../../assets/img/refresh.png";
import { getMailsThunk, handleMasterCheckboxChange, nextPage, prevPage } from "../../../redux/slices/getMailsSlice";
import classes from "./HeadChecker.module.css";

function HeadChecker() {
  const status = useParams()['*'].toUpperCase();
  const dispatch = useDispatch();
  const { mails, masterChecked, mailSelected, page, size, totalPages, loading } = useSelector((state) => state.getMailsSlice);

  const showIcons = (e) => {
    dispatch(handleMasterCheckboxChange(e.target.checked))
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(nextPage());
      dispatch(getMailsThunk({ status, page: page + 1, size }))
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(prevPage());
      dispatch(getMailsThunk({ status, page: page - 1, size }))
    }
  }

  const handleSpamEmail = () => {
    console.log("🚀 ~ file: HeadChecker.js:76 ~ handleSpamEmail ~ mailSelected:", mailSelected.map((i) => i.id))
  }

  const handleDeleteEmails = () => {
    console.log("🚀 ~ file: HeadChecker.js:76 ~ handleDeleteEmails ~ mailSelected:", mailSelected.map((i) => i.id))
  }

  const handleRefreshMail = (page, size) => {
    dispatch(getMailsThunk({ status, page, size }))
  }

  return (
    <div className={classes.head}>
      <div className={classes.headchecker}>

        <Checkbox
          className={classes.checbox}
          type="checkbox"
          onClick={showIcons}
          checked={masterChecked}
        />
        {masterChecked || mailSelected.length ? <div className="navigate">
          <ReportOutlinedIcon className={classes.pointer} onClick={handleSpamEmail} />
          <DeleteOutlinedIcon className={classes.pointer} onClick={handleDeleteEmails} />
          <ArchiveOutlinedIcon className={classes.pointer} />
          <MarkEmailReadOutlinedIcon className={classes.pointer} />
          <WatchLaterOutlinedIcon className={classes.pointer} />
          <AssignmentTurnedInOutlinedIcon className={classes.pointer} />
          <CreateNewFolderOutlinedIcon className={classes.pointer} />
          <LabelOutlinedIcon className={classes.pointer} />
          <MoreVertIcon className={classes.pointer} />
        </div> : <div className="navigate">
          <button onClick={() => handleRefreshMail(page, size)}>
            <img src={refresh} alt="refresh" />
          </button>
          <button>
            <img src={more} alt="more" />
          </button>
        </div>}
      </div>
      <div className={classes.headchecker}>
        <span className={classes.mailAmount}>{totalPages === 1 || !mails.length ? `${(page - 1) * size + 1} - ${mails.length} trong số ${mails.length}` : `${(page - 1) * size + 1} - ${page * size} trong số ${totalPages * size}`}</span>
        <button onClick={handlePrevPage} disabled={loading}>
          <ArrowBackIosIcon className={classes.headSvg} />
        </button>
        <button onClick={handleNextPage} disabled={loading}>
          <ArrowForwardIosIcon className={classes.headSvg} />
        </button>
      </div>
    </div>
  );
}

export default HeadChecker;
