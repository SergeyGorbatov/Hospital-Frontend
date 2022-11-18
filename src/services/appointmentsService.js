import $api from "src/http/index";

const createAppointment = (patient, doctor, date, complaint) => {
  return $api.post("/appointments", { patient, doctor, date, complaint });
};

const getAppointments = () => {
  return $api.get("/appointments");
};

const editAppointment = (patient, doctor, date, complaint, _id) => {
  return $api.patch(`/appointments/${_id}`, {
    patient,
    doctor,
    date,
    complaint,
  });
};

const deleteAppointment = (_id) => {
  return $api.delete(`/appointments/${_id}`);
};

export {
  createAppointment,
  getAppointments,
  editAppointment,
  deleteAppointment,
};
