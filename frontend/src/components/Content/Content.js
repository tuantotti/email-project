import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import { getMails } from "../../redux/slices/getMailsSlice";
import classes from "./Content.module.css";
import HeadChecker from "./HeadChecker/HeadChecker";
import Message from "./MessageShow/MessageShow";
import Pagination from "./Pagination/Pagination";
import SendMail from "./SendMail/SendMail";
import Snooze from "./Snooze/Snooze";
import Starred from "./Starred/Starred";
import PersonalInformation from "./PersonalInformation/PersonalInformation";


function Content() {
  const dispatch = useDispatch()
  const mails = useSelector(state => state.getMailsReducer.mails)
  const accessToken = useSelector(state => state.authenticationSlice.accessToken)
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    return setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    return setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  useEffect(() => {
    dispatch(getMails())
  }, [])
  return accessToken ? (<div className="App">
    < Navbar />
    <div className="body">
      <SideBar />
      <div className={classes.container}>
        {/* <HeadChecker /> */}
        <hr />
        <Routes>
          <Route index element={<Navigate to="inbox" />} />
          <Route path="/inbox/:mailId" element={<Message />} />

          <Route path="/personal-information" element={<PersonalInformation />} />
          <Route
            path="/starred"
            element={
              <>
                <Starred />
              </>
            }
          />

          <Route
            path="/drafts"
            element={
              <>
                <h1>Drafts</h1>
              </>
            }
          />

          <Route
            path="/snoozed"
            element={
              <>
                <Snooze />
              </>
            }
          />

          <Route
            path="/sent"
            element={
              <>
                <SendMail />
              </>
            }
          />

          <Route
            path="/inbox"
            element={
              <div className={classes.mainContent}>
                <Pagination
                  data={mails}
                  dataLimit={20}
                  currentPage={currentPage}
                  path="/inbox"
                />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  </div >) : (
    <Navigate to="signin" />
  )

}

export default Content;
