import React from "react";
import Email from "../Emails/Email";
import classes from "./Pagination.module.css"

function Pagination({ data, dataLimit, currentPage,path }) {
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    const newData = Object.values(data);
    console.log(newData)
    return newData.slice(startIndex, endIndex);
  };

  return (
    <div className={classes.Pagination}>
      {getPaginatedData().map((d, i) => {
        return (
          <Email
            key={d.id}
            id={d.id}
            company={d.company_Name}
            description={d.description}
            subject={d.subject}
            time={d.time}
            email_address={d.email_address}
            isRead={d.isRead}
            path={path}
          />
        );
      })}
    </div>
  );
}

export default Pagination;
