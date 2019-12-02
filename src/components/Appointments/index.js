import React, { Fragment } from 'react';
import "./styles.scss";
import Header from "components/Appointments/header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import { useVisualMode } from "hooks/useVisualMode";
import Form from "components/Appointments/Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  console.log(props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
  />
)}
{mode === CREATE && (
  <Form 
  interviewers={[]}
  onCancel={back}
  />
)}
    </article>
  );
}