import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  const interviewerImageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected && props.image
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}