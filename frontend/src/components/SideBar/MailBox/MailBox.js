import ClearIcon from '@material-ui/icons/Clear';
import React, { useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { sendMailThunk } from "../../../redux/slices/sendMailSlice";
import attachIcon from "../Images/attach_icon.png";
import classes from "./MailBox.module.css";


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["file"]
  ],
}

function MailBox({ hide }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [toAddress, setToAddress] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [files, setFiles] = useState(null);

  const handleAttachIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = () => {
    const files = fileInputRef.current.files;
    setFiles(Array.from(files))
    console.log(files);
  };

  const bytesToKB = (bytes) => {
    return (bytes / 1024).toFixed(2);
  }

  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  const removeFile = (idx) => {
    setFiles(prevFiles => prevFiles.filter((file, i) => i !== idx))
  }

  const handleSendMail = () => {
    if (toAddress) {
      const formData = new FormData();
      formData.append('fromAddress', "dungnd@gmail.com")
      formData.append('toAddress', toAddress)
      formData.append('subject', subject)
      formData.append('body', body)

      for (let i = 0 ; i < files.length ; i++) {
        formData.append("files", files[i]);
    }
      dispatch(sendMailThunk(formData))
    }
  }

  return (<div className={classes.form}>
    <div className={classes.mailBoxHeader}>
      <h2 className={classes.newMail}>Thư mới</h2>
      <ClearIcon onClick={hide} style={{ cursor: "pointer" }} />
    </div>
    <div className={classes.content}>
      <div className={classes.inputGroup}>
        <input className={classes.input} placeholder="Người nhận" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
      </div>
      <hr></hr>
      <div className={classes.inputGroup}>
        <input className={classes.input} placeholder="Tiêu đề" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <hr></hr>
      {/* <br />
      <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
      <br />
      <div className={classes.scrollContent}>
        <ReactQuill theme="snow" value={body} onChange={setBody} modules={modules} />
        <div className={classes.fileAttachGroup}>
          {files?.length ? files?.map((file, idx) => (
            <div className={classes.file}>
              <div className={classes.fileName}>
                <h3>{file.name}</h3>
                <span>({bytesToKB(file.size) < 1024 ? bytesToKB(file.size) : bytesToMB(file.size)} {bytesToKB(file.size) < 1024 ? 'KB' : 'MB'})</span>
              </div>
              <ClearIcon style={{ cursor: "pointer", width: '18px', height: '18px' }} onClick={() => removeFile(idx)} />
            </div>
          )) : null}
        </div>
      </div>
      <div className={classes.mailBoxFooter}>
        <button className={classes.sendButton} onClick={handleSendMail}>Gửi</button>
        <button className={classes.attachButton} onClick={handleAttachIconClick} >
          Đính kèm
          <img alt="attach_icon" src={attachIcon} className={classes.footerIcon} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          hidden
          multiple
        />
      </div>
    </div>
  </div>
  );
}

export default MailBox;
