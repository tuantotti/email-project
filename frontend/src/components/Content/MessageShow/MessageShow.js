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
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import avatarDefault from "../../../assets/img/avatar_default.png";
import IconArchive from "../../../assets/img/icon_archive.png";
import IconImage from "../../../assets/img/icon_image.png";
import IconPdf from "../../../assets/img/icon_pdf.png";
import IconScript from "../../../assets/img/icon_script.png";
import IconText from "../../../assets/img/icon_text.png";
import IconVideo from "../../../assets/img/icon_video.png";
import { downloadFileThunk } from "../../../redux/slices/viewMailSlice";
import "./MessageShow.css";

export default function Message(props) {
  const navigate = useNavigate();
  const [path, mailId] = useParams()['*'].split('/');
  const { mailDetail } = useSelector(state => state.viewMailSlice)
  const { user } = useSelector(state => state.userInfoSlice)
  const dispatch = useDispatch();
  const navigateBack = () => {
    navigate(`/${path}`);
  }
  const Navigate = (
    <div className="navigate">
      <button onClick={navigateBack}>
        <ArrowBackIcon className="navigate_back" />
      </button>
      <ReportOutlinedIcon className="pointer" />
      <DeleteOutlinedIcon className="pointer" />
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

  const handleLongFileName = (name) => {
    let NAME = ''
    const list = name.split(" ")
    const handle = (fileName) => {
      if (!fileName.includes(" ") && fileName.length > 19) {
        fileName = fileName.slice(0, 19) + " " + handleLongFileName(fileName.slice(19));
      }

      return fileName;
    }
    list.forEach(str => {
      NAME += handle(str) + " "
    })
    return NAME;
  }

  const bytesToKB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  }

  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  const handleDownloadFile = async (fileName) => {

    try {
      dispatch(downloadFileThunk(fileName)).then(response => {
        if (response.type === "downloadFile/fulfilled") {
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mailDetailContainer">
      {Navigate}
      <h2 className="mailTitle">{mailDetail?.subject}</h2>
      <div className="mailAddressContainer">
        <img alt="mailAvatar" className="mailAvatar" src={avatarDefault} />
        <div>
          <span className="mailAuthor">{mailDetail?.fromName}</span>
          <span>{" "}</span>
          <span className="mailAddress">{"<"}{mailDetail?.fromAddress}{">"}</span>
          <h3 className="mailAddressDestination">to {user.email === mailDetail?.toAddress ? "Me" : mailDetail?.toAddress}</h3>
          <h3 className="mailTime">{handleTime(mailDetail?.sendDate)}</h3>
        </div>
      </div>
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: mailDetail?.body }} className="description"></div>

      <br />
      <br />
      <br />
      {mailDetail.fileDataList?.length ? <div className="fileGroup">
        <div className="dash"></div>
        <span className="fileQuantity">{mailDetail.fileDataList?.length} attachment</span>
        <div className="fileItemBlock">
          {mailDetail.fileDataList?.map(item => <div className="fileItem">
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
                  <div className="fileNameFull">{handleLongFileName(item.name)}</div>
                  <span className="fileCapacity">{bytesToKB(item.size) < 1024 ? bytesToKB(item.size) : bytesToMB(item.size)} {bytesToKB(item.size) < 1024 ? 'KB' : 'MB'}</span>
                </div>
                <div className="downloadFile" onClick={() => handleDownloadFile(item.name)}>
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
