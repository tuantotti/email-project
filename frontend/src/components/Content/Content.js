import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import classes from "./Content.module.css";
import HeadChecker from "./HeadChecker/HeadChecker";
import Message from "./MessageShow/MessageShow";
import Pagination from "./Pagination/Pagination";
import SendMail from "./SendMail/SendMail";
import Snooze from "./Snooze/Snooze";
import Starred from "./Starred/Starred";
import { getMails } from "../../redux/slices/getMailsSlice";


function Content() {
  const dispatch = useDispatch()
  const mails = useSelector(state => state.getMailsReducer.mails)
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
  return (
    <div className={classes.container}>


      <Switch>
        <Route path="/inbox/:mailId">
          <Message />
        </Route>

        <Route path="/starred">
          <HeadChecker />
          <hr />
          <Starred />
        </Route>

        <Route path="/drafts">
          <HeadChecker />
          <hr />
          <h1>Drafts</h1>
        </Route>

        <Route path="/snoozed">
          <HeadChecker />
          <hr />
          <Snooze />
        </Route>

        <Route path="/sent">
          <HeadChecker />
          <hr />
          <SendMail />
        </Route>

        <Route path="/inbox">
          <div className={classes.mainContent}>
            <HeadChecker />
            <hr />
            <Pagination
              data={mails}
              dataLimit={20}
              currentPage={currentPage}
              path="/inbox"
            />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Content;
