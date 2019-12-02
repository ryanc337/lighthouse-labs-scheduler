import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import InterviewList from "components/DayList";
import Appointment from "components/Appointments/index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    let daysUrl = "/api/days";
    let appsUrl = "/api/appointments";
    let interviewersUrl = "/api/interviewers"
  
    const promiseDays = axios.get(daysUrl)
    const promiseApps = axios.get(appsUrl);
    const promiseInts = axios.get(interviewersUrl);

    Promise.all([promiseDays, promiseApps, promiseInts]).then(response => {
    setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
    });
  }, [])

  const setDay = day => setState({ ...state, day });; 
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

     const appointments = {
       ...state.appointments,
       [id]: appointment
     };

     axios
     .put(`http://localhost:8001/api/appointments/${id}`, appointment)
     .then(setState({...state, appointments}))
     .catch(err => console.error(err));    
}

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

     const appointments = {
       ...state.appointments,
       [id]: appointment
     };

    axios
    .delete(`http://localhost:8001/api/appointments/${id}`)
    .then(setState({...state, appointments}))
    .catch(err => console.error(err)); 
  }


  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});
  return (<main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList days={state.days} setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
