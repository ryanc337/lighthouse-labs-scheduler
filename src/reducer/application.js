export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const UPDATE_INTERVIEW = "UPDATE_INTERVIEW";
export const UPDATE_SPOTS = "UPDATE_SPOTS";

export default function reducer(state, action) {
  const setSpots = () => {
    let spotCount = 5;
    for (let day in state.days) {
      if (state.days[day].name === state.day) {
        for (let id of state.days[day].appointments) {
          if (state.appointments[id].interview !== null) {
            spotCount--;
          }
        }
      }
    }
    return state.days.map(day => {
      if (day.name !== state.day) {
        return day;
      }
      return {
        ...day,
        spots: spotCount
      };
    });
  }

  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      const days = action.value[0].data;
      const appointments = action.value[1].data;
      const interviewers = action.value[2].data;
      return { ...state, days, appointments, interviewers };
    case SET_INTERVIEW:
      return { ...state, appointments: action.value, days: setSpots() };
    case UPDATE_INTERVIEW:
      const newAppointment = {
        ...state.appointments[action.value.id],
        interview: action.value.interview
      };
      const newAppointments = {
        ...state.appointments,
        [action.value.id]: newAppointment
      };
      return { ...state, appointments: newAppointments };
    case UPDATE_SPOTS:
      return { ...state, days: setSpots() };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}




