import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Navbar from "../../components/Navigation/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import "./Content.css";
import HeadChecker from "./HeadChecker/HeadChecker";
import Message from "./MessageShow/MessageShow";
import Pagination from "./Pagination/Pagination";
import SendMail from "./SendMail/SendMail";
import Spam from "./Spam/Spam";
import Trash from "./Trash/Trash";
import Starred from "./Starred/Starred";


function Content() {
  const dispatch = useDispatch()
  const { mails, loading } = useSelector(state => state.getMailsSlice)
  const accessToken = useSelector(state => state.authenticationSlice.accessToken)
  const [path, mailId] = useParams()['*'].split('/');
  const mainContent = (children) => {
    return mails && mails.length ? <div className='mainContent'>
      {loading && <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }}>
        <LinearProgress sx={{ height: 10 }} />
      </Box>}
      {loading && <div className="overlay"></div>}
      {children}
    </div> : <></>
  }

  return accessToken ? (<div className="App">
    < Navbar />
    <div className="body">
      <SideBar />
      <div>
        {!mailId && <HeadChecker />}
        <hr />
        <Routes>
          <Route index element={<Navigate to="inbox" />} />
          <Route path={`/${path}/:mailId`} element={<Message />} />

          <Route
            path="/trash"
            element={mainContent(<Trash />)}
          />

          <Route
            path="/spam"
            element={mainContent(<Spam />)}
          />

          <Route
            path="/starred"
            element={mainContent(<Starred />)}
          />

          <Route
            path="/sent"
            element={mainContent(<SendMail />)}
          />

          <Route
            path="/inbox"
            element={mainContent(<Pagination />)}
          />
        </Routes>
      </div>
    </div>
  </div >) : (
    <Navigate to="signin" />
  )

}

export default Content;
