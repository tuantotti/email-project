import ArchiveIcon from "@material-ui/icons/Archive";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelIcon from "@material-ui/icons/Label";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReportIcon from "@material-ui/icons/Report";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptySelected } from "../../../redux/action/mailSelectAct";
import { deleteMultiple } from "../../../redux/action/search";
import { usePageContext } from "../Content";
import more from "../Images/more.png";
import refresh from "../Images/refresh.png";
import classes from "./HeadChecker.module.css";

function HeadChecker() {
  const dispatch = useDispatch();
  const selectedMails = useSelector((state) => state.mailSelectRed);
  const notChecked = (
    <div className="navigate">
      <button>
        <img src={refresh} alt="refresh" />
      </button>
      <button>
        <img src={more} alt="more" />
      </button>
    </div>
  );
  const [checked, setCheckBox] = useState(notChecked);
  const navigate = (
    <div className="navigate">
      <ReportIcon />
      <ArchiveIcon />
      <DeleteIcon onClick={deleteMul} />
      <MarkunreadIcon />
      <WatchLaterIcon />
      <AssignmentTurnedInIcon />
      <CreateNewFolderIcon />
      <LabelIcon />
      <MoreVertIcon />
    </div>
  );
  function showIcons(e) {
    if (e.target.checked === true) {
      setCheckBox(navigate);
    } else {
      setCheckBox(notChecked);
    }
  }


  function deleteMul() {
    dispatch(deleteMultiple(selectedMails));
    dispatch(emptySelected());
  }

  const obj = usePageContext();
  return (
    <div className={classes.head}>
      <div className={classes.headchecker}>
        <input
          className={classes.checbox}
          type="checkbox"
          onClick={showIcons}
        />
        {checked}
      </div>
      <div className={classes.headchecker}>
        <span className={classes.mailAmount}>{(obj.currentPage-1)*20+1}-{obj.currentPage*20} trong số 2.000</span>
        <button onClick={obj.goToPreviousPage}>
          <ArrowBackIosIcon className={classes.headSvg}/>
        </button>
        <button onClick={obj.goToNextPage}>
         <ArrowForwardIosIcon className={classes.headSvg}/>
        </button>
      </div>
    </div>
  );
}

export default HeadChecker;
