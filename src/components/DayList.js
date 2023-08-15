import React from "react";

import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={props.updateSpots(props.appointments, props.days, day)}
        selected={day.name === props.day}
        setDay={() => props.setDay(day.name)}
      />
    );
  });

  return (<ul>{days}</ul>);
}