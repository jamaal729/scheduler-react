import React from "react";

import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    console.log(name, interviewer);
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function remove() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === SHOW && <Show
        student={props.interview.student} interviewer={props.interview.interviewer}
        onDelete={() => { transition(CONFIRM); }}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers} name={""} interviewer={""}
        onSave={(name, interviewer) => save(name, interviewer)}
        onCancel={() => back()}
      />}
      {mode === SAVING && <Status
        message="Saving"
      />}
      {mode === DELETING && <Status
        message="Deleting"
      />}
      {mode === CONFIRM && <Confirm
        message={"Confirm delete?"}
        onConfirm={() => remove()}
        onCancel={back}
      />}
    </article>
  )
}