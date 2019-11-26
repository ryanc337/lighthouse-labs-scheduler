import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
const classNames = require("classnames");

export default function InterviewerList(props) {
  console.log("interviewList", props)
  const InterviewerClass = classNames("interviewers", {
    "interviewers__header": true,
    "interviewers__list": true,  
    "text--light": true
  });

  const interviewers = props.interviewers.map((interviewer) => {
    console.log("inside map", interviewer);
   return(<InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={event => props.onChange(interviewer.id)}
    />
    )
  })

return (<section className={InterviewerClass}>
    <h4>Interviewer</h4>
    <ul>
      {interviewers}
    </ul>
  </section>)
}