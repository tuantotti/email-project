import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { send } from "../../../redux/action/send";
import ClearIcon from '@material-ui/icons/Clear';
import attachIcon from "../Images/attach_icon.png"
import classes from "./MailBox.module.css";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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
  const fileInputRef = useRef(null);
  const [value, setValue] = useState("")
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

  const removeFile = (idx) => {
    setFiles(prevFiles => prevFiles.filter((file, i) => i !== idx))
  }


  return (<div className={classes.form}>
    <div className={classes.mailBoxHeader}>
      <h2 className={classes.newMail}>Thư mới</h2>
      <ClearIcon onClick={hide} style={{ cursor: "pointer" }} />
    </div>
    <div className={classes.content}>
      <div className={classes.inputGroup}>
        <input className={classes.input} placeholder="Người nhận" />
      </div>
      <hr></hr>
      <div className={classes.inputGroup}>
        <input className={classes.input} placeholder="Tiêu đề" />
      </div>
      <hr></hr>
      {/* <br />
      <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
      <br />
      <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
      <div className={classes.fileAttachGroup}>
        {files?.length ? files?.map((file, idx) => (
          <div className={classes.file}>
            <div className={classes.fileName}>
              <h3>{file.name}</h3>
              <span>({bytesToKB(file.size)}KB)</span>
            </div>
            <ClearIcon style={{ cursor: "pointer", width: '18px', height: '18px' }} onClick={() => removeFile(idx)} />
          </div>
        )) : null}
      </div>
      <div className={classes.mailBoxFooter}>
        <button className={classes.sendButton}>Gửi</button>
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
