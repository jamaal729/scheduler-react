export const getAppointmentsForDay = (state, day) => {
  let appointmentIds = [];
  state.days.filter(d => {
    if (d.name === day) {
      appointmentIds = d.appointments
    }
  });
  let appointmentsForDay = []
  appointmentIds.forEach(c => {
    appointmentsForDay.push(state.appointments[c.toString()]);
  })
  return appointmentsForDay;
};

export const getInterviewersForDay = (state, day) => {
  let currentDay = null;
  let currentInterviewers = [];
  const interviewers = [];
  state.days.map(d => {
    if (d.name === day) {
      currentDay = d.name;
      currentInterviewers = d.interviewers || [];
    }
  });
  if (currentDay !== null) {
    for (let i of currentInterviewers) {
      interviewers.push(state.interviewers[i]);
    }
  }
  return interviewers;
};

export const getInterview = (state, stateInterview) => {
  if (stateInterview === null) {
    return null;
  }

  const interviewObj = { ...stateInterview };
  interviewObj.interviewer = state.interviewers[interviewObj.interviewer];

  return interviewObj;
}