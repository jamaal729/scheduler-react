import React from "react";

import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const value = props.value;
  const onChange = props.onChange;
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });

  return (
    <section class="interviewers">
      <h4 class="interviewers__header" >Interviewer</h4>
      <ul class="interviewers__list">{interviewers}</ul>
    </section>
  );
}