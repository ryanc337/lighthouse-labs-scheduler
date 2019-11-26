import React from "react";
import "./InterviewerListItem.scss";
// import { format } from "path";
const classNames = require("classnames");

export default function InterviewerListItem(props) {
  // console.log("interviewListItem", props)
  const InterviewerClass = classNames("interviewers", {
    "interviewers__item": true,
    "interviewers-image": true,
    "interviewers--selected": true,
    "interviewers--selected-image": true
  });

  return (
    <li className={InterviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}