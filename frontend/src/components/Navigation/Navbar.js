import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useClickOutSide from "../../hooks/useClickOutside";
import navbarTheme from "../../theme/Navbar.theme";
import glogo from "./Images/gmail_logo.png";
import man from "./Images/man.png";
import menu from "./Images/menu.png";
import classes from "./Navbar.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { logout } from '../../redux/slices/authenticationSlice';
import { getUserInformation } from '../../redux/slices/getUserInfoSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show, setShow, nodeRef } = useClickOutSide();

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(getUserInformation())
  }, [])

  return (
    <ThemeProvider theme={navbarTheme}>
      <div className={classes.navbar}>
        <div className={classes.menuBrand}>
          <button>
            <img src={menu} alt="menu" />
          </button>
          <img src={glogo} alt="glogo" />
        </div>
        <SearchBar />
        <div className={classes.list}>
          <IconButton aria-label="delete" ref={nodeRef} onClick={() => setShow(!show)}>
            <Avatar alt="avt" src={man} />
            <div className={classes.arrowGroup}>
              <svg fill="currentColor" viewBox="0 0 16 16" width="12" height="12" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 x1kpxq89 xsmyaan"><g fillRule="evenodd" transform="translate(-448 -544)"><path fillRule="nonzero" d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"></path></g></svg>
            </div>

            {show && <div className={classes.actionGroup}>
              <div className={classes.nameGroup}>
                <div className={classes.inforDetail}>
                  <Avatar alt="avt" src={man} />
                  <span className={classes.name}>Dat Dang</span>
                </div>
                <div className={classes.divide}></div>
                <span className={classes.emailAddress}>nguyenvana_hanoi@gmail.com</span>
              </div>
              <div className={classes.actionText} onClick={() => { navigate("/personal-information") }}>
                <span>
                  <AccountCircleRoundedIcon /> Personal Information
                </span>
                <ArrowForwardIosIcon /></div>
              <div className={classes.actionText} onClick={handleLogout}>
                <span>
                  <LogoutIcon /> Log out
                </span>
                <ArrowForwardIosIcon /></div>
            </div>}
          </IconButton>
        </div>

      </div>
    </ThemeProvider>
  );
}

export default Navbar;
