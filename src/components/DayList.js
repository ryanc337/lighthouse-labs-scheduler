import React from "react";
import DayListItem from "./DayListItem";
import useApplicationData from "hooks/useApplicationData";

export default function DayList(props) { 
  const Days = props.days.map((day) => {
    console.log(props.day);
    return (
      <DayListItem 
      key={day.id}
      id={day.id}
      name={day.name}
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}
      />
    )
  })
  return (<ul>
    {Days}
  </ul>)
}
