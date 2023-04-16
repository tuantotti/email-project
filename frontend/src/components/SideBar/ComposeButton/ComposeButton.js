import React,{useState} from "react";
import MailBox from "../MailBox/MailBox";
import classes from "./ComposeButton.module.css";

function ComposeButton() {
  const [mailBox,setMailBox]=useState(false);
 
  function showMailBox(){
    setMailBox(true);
  }
  function hideMailBox(){
    setMailBox(false);
  }
  return (
  <div >
    <button className={classes.compose} onClick={showMailBox} >
      <img alt="" src='https://www.gstatic.com/images/icons/material/system_gm/2x/create_black_24dp.png' />
      <h3>Soạn thư</h3>
    </button>
    {mailBox && <MailBox hide={hideMailBox}/>}
    </div>
  );
}

export default ComposeButton;
