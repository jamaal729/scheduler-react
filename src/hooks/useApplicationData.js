import { useReducer, useEffect } from "react";

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8001";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`${apiBaseUrl}/api/days`)),
      Promise.resolve(axios.get(`${apiBaseUrl}/api/appointments`)),
      Promise.resolve(axios.get(`${apiBaseUrl}/api/interviewers`))
    ])
      .then(all => {
        dispatch({ type: SET_APPLICATION_DATA, value: all });
      })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`${apiBaseUrl}/api/appointments/${id}`, { interview })
      .then(() => { dispatch({ type: SET_INTERVIEW, value: appointments }); });
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

    return axios.delete(`${apiBaseUrl}/api/appointments/${id}`)
      .then(() => { dispatch({ type: SET_INTERVIEW, value: appointments }); });
  }

  function updateSpots(appointments, days, day) {
    const currentDay = days.find(target => target.name === day.name);
    const currentAppointments = [...currentDay.appointments];
    const allSpots = currentAppointments.length;
    const usedSpots = Object.values({ ...appointments }).reduce(
      (total, appointment) => {
        if (currentAppointments.includes(appointment.id)) {
          if (appointment.interview) {
            total++;
          }
        }
        return total;
      }, 0
    );
    return allSpots - usedSpots;
  }

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}