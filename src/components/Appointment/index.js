import React from "react";

import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  }

  function remove() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === SHOW && <Show
        student={props.interview.student} interviewer={props.interview.interviewer}
        onEdit={() => { transition(EDIT); }}
        onDelete={() => { transition(CONFIRM); }}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        interviewer={""} student={""}
        onSave={(student, interviewer) => save(student, interviewer)}
        onCancel={() => back()}
      />}
      {mode === EDIT && <Form
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id} student={props.interview.student}
        onSave={(student, interviewer) => save(student, interviewer)}
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
        onCancel={() => back()}
      />}
      {mode === ERROR_SAVE && <Error
        message={"Error saving appointment"}
        onClose={() => back()}
      />}
      {mode === ERROR_DELETE && <Error
        message={"Error deleting appointment"}
        onClose={() => back()}
      />}
    </article>
  )
}