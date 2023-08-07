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