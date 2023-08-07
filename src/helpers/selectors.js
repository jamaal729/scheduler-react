export const getAppointmentsForDay = (state, day) => {

  let currentAppointmentIds = [];

  state.days.filter(d => {
    if (d.name === day) {
      currentAppointmentIds = d.appointments
    }
  });

  let appointmentsForDay = []
  currentAppointmentIds.forEach(c => {
    appointmentsForDay.push(state.appointments[c.toString()]);
  })

  return appointmentsForDay;
};


export const getInterview = (state, stateInterview) => {
  if (stateInterview === null) {
    return null;
  }

  const interviewObj = { ...stateInterview };
  interviewObj.interviewer = state.interviewers[interviewObj.interviewer];

  return interviewObj;
}