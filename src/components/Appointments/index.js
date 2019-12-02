import React, { useEffect } from 'react';
import "./styles.scss";
import Header from "components/Appointments/header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import { useVisualMode } from "hooks/useVisualMode";
import Form from "components/Appointments/Form";
import Status from "components/Appointments/Status";
import Confirm from "components/Appointments/Confirm";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const saving = props.bookInterview(props.id, interview);
    if (saving === undefined) {
      setTimeout(() => {
        transition(SHOW);
      }, 1000)
    }
}
function deleteApp() {
  transition(DELETING);
    const deleting = props.cancelInterview(props.id);
    if (deleting === undefined) {
      setTimeout(() => {
        transition(EMPTY);
      }, 1000)
    }


}
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
  />
)}
{mode === CREATE && (
  <Form 
  interviewers={props.interviewers}
  onCancel={back}
  onSave={save}
  />
)}
{mode === SAVING && (
  <Status
  message="Saving"
  />
)}
{mode === DELETING && (
  <Status
  message="Deleting"
  />
)}
{mode === CONFIRM && (
<Confirm
message="Are you sure you would like to delete?"
onCancel={() => back()}
onConfirm={deleteApp}
/>
)}
    </article>
  );
}