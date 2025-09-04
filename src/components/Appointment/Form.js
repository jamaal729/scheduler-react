import React from "react";

import "./styles.scss";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /* This must be a controlled component; your code goes here */
            value={props.student}
          />
        </form>
        <InterviewerList
          /* your code goes here */
          interviewers={props.interviewers}
          value={props.interviewer}
          onChange={props.setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel} >Cancel</Button>
          <Button confirm onClick={props.onSave} >Save</Button>
        </section>
      </section>
    </main>
  )
}