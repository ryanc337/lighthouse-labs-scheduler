export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => { 
    return singleDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const appointmentsMapped = filteredDays[0].appointments.map((app) => {
    return state.appointments[app]
  })

  return appointmentsMapped;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const newInterview = {
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer] }
  }
  
  return newInterview;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => { 
    return singleDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const interviewersMapped = filteredDays[0].interviewers.map((int) => {
    return state.interviewers[int]
  })

  return interviewersMapped;
}