import React, { Fragment } from 'react';
import "./styles.scss";
import Header from "components/Appointments/header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";


export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      { props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer}/> }
      { !props.interview && <Empty />}
    </article>
  );
}