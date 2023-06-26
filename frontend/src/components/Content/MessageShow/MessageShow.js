import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import moment from "moment";
import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import avatarDefault from "../../../assets/img/avatar_default.png";
import IconArchive from "../../../assets/img/icon_archive.png";
import IconImage from "../../../assets/img/icon_image.png";
import IconPdf from "../../../assets/img/icon_pdf.png";
import IconScript from "../../../assets/img/icon_script.png";
import IconText from "../../../assets/img/icon_text.png";
import IconVideo from "../../../assets/img/icon_video.png";
import "./MessageShow.css";


export default function Message(props) {
  const navigate = useNavigate();
  const [path, mailId] = useParams()['*'].split('/');
  const mailData = useSelector((state) => state.getMailsSlice.mails.find(item => item.id === parseInt(mailId)));
  const listFile = [
    { name: 'report.txt' },
    { name: 'Cambridge Ielts 11 mù tạt cà phê mi nhon loăng quăng.zip' },
    { name: 'Cambridge Ielts 17.pdf' },
    { name: 'Speaking Part II.mp4' },
    { name: 'abcdefghbcaed.png' },
    { name: 'report.txt' },
    { name: 'Cambridge Ielts 11.zip' },
    { name: 'Cambridge Ielts 17.pdf' },
    { name: 'Speaking Part II.mp4' },
    { name: 'abcdefghbcaed.png' },
  ];

  const navigateBack = () => {
    navigate(`/${path}`);
  }
  const Navigate = (
    <div className="navigate">
      <button onClick={navigateBack}>
        <ArrowBackIcon className="navigate_back" />
      </button>
      <ReportOutlinedIcon className="pointer"/>
      <DeleteOutlinedIcon className="pointer"/>
      <ArchiveOutlinedIcon className="pointer" />
      <MarkEmailReadOutlinedIcon className="pointer" />
      <WatchLaterOutlinedIcon className="pointer" />
      <AssignmentTurnedInOutlinedIcon className="pointer" />
      <CreateNewFolderOutlinedIcon className="pointer" />
      <LabelOutlinedIcon className="pointer" />
      <MoreVertIcon className="pointer" />
    </div>
  );

  const handleFileType = (name, returnType = 'icon') => {
    const extension = name.split('.').pop().toLowerCase();

    if (extension === 'pdf') {
      return returnType === 'icon' ? IconPdf : 'pdf';
    } else if (['txt', 'doc', 'docx', 'csv'].includes(extension)) {
      return returnType === 'icon' ? IconText : 'text';
    } else if (['zip', 'rar'].includes(extension)) {
      return returnType === 'icon' ? IconArchive : 'archive';
    } else if (['js', 'py', 'sh', 'sql'].includes(extension)) {
      return returnType === 'icon' ? IconScript : 'script';
    } else if (extension.match(/^(jpg|jpeg|png|gif)$/)) {
      return returnType === 'icon' ? IconImage : 'image';
    } else if (['mp4', 'mov', 'avi', 'mkv'].includes(extension)) {
      return returnType === 'icon' ? IconVideo : 'video';
    } else {
      return null;
    }
  }

  const handlePositionIcon = (fileType) => {
    if (fileType === 'pdf') {
      return '-162px -47px'
    } else if (fileType === 'text') {
      return '-121px -47px'
    } else if (fileType === 'image') {
      return '-96px 0px'
    } else if (fileType === 'script') {
      return '-203px 0px'
    } else if (fileType === 'archive') {
      return '-88px -88px'
    } else if (fileType === 'video') {
      return '-262px -107px'
    } else {
      return null;
    }
  }

  const handleTime = (time) => {
    var currentTime = moment();
    let formattedTime;

    if (currentTime.year() === moment(time).year()) {
      formattedTime = moment(time).format('ddd, MMM D, h:mm A');
    } else {
      formattedTime = moment(time).format('ddd, MMM D, YYYY, h:mm A');
    }

    return formattedTime;
  }
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
          <h3 className="mailAddressDestination">to {true ? "Me" : "<test@gmail.com>"}</h3>
          <h3 className="mailTime">{handleTime(mailData?.time)}</h3>
        </div>
      </div>
      <br />
      <br />
      <p className="description">{mailData?.subject}</p>
      <br />
      <br />
      <br />
      {listFile.length ? <div className="fileGroup">
        <div className="dash"></div>
        <span className="fileQuantity">{listFile.length} tệp đính kèm</span>
        <div className="fileItemBlock">
          {listFile.map(item => <div className="fileItem">
            <div className="fileItemUpper">
              <div style={{ backgroundPosition: `${handlePositionIcon(handleFileType(item.name, 'type'))}` }}></div>
            </div>
            <div className="fileItemLower">
              <img src={handleFileType(item.name)} className="fileIcon" />
              <span className="fileName">{item.name}</span>
            </div>
            <div className="rect" style={{ borderLeft: `10px solid #fb4c2f` }}></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="fileHover">
              <img src={handleFileType(item.name)} className="fileIcon" />
              <div className="fileInfor">
                <div className="fileInforDetail">
                  <div className="fileNameFull">{item.name}</div>
                  <span className="fileCapacity">177 KB</span>
                </div>
                <div className="downloadFile">
                  <div className='downloadIcon'></div>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div> : <></>}
    </div >
  );
}
