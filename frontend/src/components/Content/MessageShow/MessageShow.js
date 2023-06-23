import ArchiveIcon from "@material-ui/icons/Archive";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelIcon from "@material-ui/icons/Label";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReportIcon from "@material-ui/icons/Report";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import avatarDefault from "../Images/avatar_default.png";
import "./MessageShow.css";

export default function Message(props) {
  const navigate = useNavigate();
  const { mailId } = useParams();
  const mailData = useSelector((state) => state.showMessage);

  const navigateBack = () => {
    navigate("/inbox");
  }
  const randomDate = () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-12-31');

    const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());

    const randomDate = new Date(randomTimestamp);

    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };

    return randomDate.toLocaleDateString('en-US', options);
  }

  const Navigate = (
    <div className="navigate">
      <button onClick={navigateBack}>
        <ArrowBackIcon className="navigate_back" />
      </button>
      <ReportIcon />
      <ArchiveIcon />
      <DeleteIcon />
      <MarkunreadIcon />
      <WatchLaterIcon />
      <AssignmentTurnedInIcon />
      <CreateNewFolderIcon />
      <LabelIcon />
      <MoreVertIcon />
    </div>
  );

  useEffect(() => { 
    console.log("🚀 ~ file: MessageShow.js:56 ~ useEffect ~ useEffect ~ mailId:", mailId)
  }, [])
  return (
    <div className="mailDetailContainer">
      {Navigate}
      <h2 className="mailTitle">{mailData?.description}</h2>
      <div className="mailAddressContainer">
        <img alt="mailAvatar" className="mailAvatar" src={avatarDefault} />
        <div>
          <span className="mailAuthor">{mailData?.company_Name}</span>
          <span>{" "}</span>
          <span className="mailAddress">{"<"}{mailData?.email_address}{">"}</span>
          <h3 className="mailAddressDestination">đến {false ? "tôi" : "<test@gmail.com>"}</h3>
          <h3 className="mailTime">{mailData?.time}{" "}{randomDate()}</h3>
        </div>
      </div>
      <br />
      <br />
      <p className="description">{mailData?.subject}</p>
    </div>
  );
}
