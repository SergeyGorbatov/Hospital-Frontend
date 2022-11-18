import moment from "moment/moment";

const sortPatient = (appointments) => {
  const newAppointments = [...appointments].sort(
    (appointment, nextAppointment) => {
      if (appointment.patient.toLowerCase() > nextAppointment.patient.toLowerCase()) {
        return 1;
      }
      if (appointment.patient.toLowerCase() < nextAppointment.patient.toLowerCase()) {
        return -1;
      }
      return 0;
    }
  );

  return newAppointments;
};

const sortDoctor = (appointments) => {
  const newAppointments = [...appointments].sort(
    (appointment, nextAppointment) => {
      if (appointment.doctor.toLowerCase() > nextAppointment.doctor.toLowerCase()) {
        return 1;
      }
      if (appointment.doctor.toLowerCase() < nextAppointment.doctor.toLowerCase()) {
        return -1;
      }
      return 0;
    }
  );

  return newAppointments;
};

const sortDate = (appointments) => {
  const newAppointments = [...appointments].sort((a, b) =>
    moment(a.date).format("YYYYMMDD") - moment(b.date).format("YYYYMMDD")
  );
  return newAppointments;
};

export {
  sortPatient,
  sortDoctor,
  sortDate,
};
