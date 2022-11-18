import { useState } from "react";
import { doctors } from "src/constants";
import "./style.scss";

const CreateAppointment = ({ addNewAppointment }) => {
  const [appointmentData, setAppointmentData] = useState({
    patient: "",
    doctor: "",
    date: "",
    complaint: "",
  });

  const disabledButton = !(
    appointmentData.patient &&
    appointmentData.doctor &&
    appointmentData.date &&
    appointmentData.complaint
  );

  const handleChange = (name, value) => {
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  };

  const addAppointment = () => {
    addNewAppointment(
      appointmentData.patient,
      appointmentData.doctor,
      appointmentData.date,
      appointmentData.complaint
    );
    setAppointmentData({
      patient: "",
      doctor: "",
      date: "",
      complaint: "",
    });
  };

  return (
    <div className="create-appointment">
      <form className="create-appointment__form">
        <div className="create-appointment__group-input">
          <label className="create-appointment__text" htmlFor="input-patient">
            Имя:
          </label>
          <input
            id="input-patient"
            type="text"
            className="create-appointment__input"
            value={appointmentData.patient}
            onChange={(event) => handleChange("patient", event.target.value)}
          />
        </div>
        <div className="create-appointment__group-input">
          <label className="create-appointment__text" htmlFor="input-doctor">
            Врач:
          </label>
          <select
            id="input-doctor"
            className="create-appointment__input"
            value={appointmentData.doctor}
            onChange={(event) => handleChange("doctor", event.target.value)}
          >
            {doctors.map((item) => {
              return (
                <option className="option" key={item.uniqueKey}>
                  {item.doctor}
                </option>
              );
            })}
          </select>
        </div>
        <div className="create-appointment__group-input">
          <label className="create-appointment__text" htmlFor="input-date">
            Дата:
          </label>
          <input
            id="input-date"
            type="date"
            className="create-appointment__input"
            value={appointmentData.date}
            onChange={(event) => handleChange("date", event.target.value)}
          />
        </div>
        <div className="create-appointment__group-input">
          <label className="create-appointment__text" htmlFor="input-complaint">
            Жалобы:
          </label>
          <input
            id="input-complaint"
            type="text"
            className="create-appointment__input"
            value={appointmentData.complaint}
            onChange={(event) => handleChange("complaint", event.target.value)}
          />
        </div>
        <button
          type="button"
          className="create-appointment__button create-appointment__text"
          disabled={disabledButton}
          onClick={addAppointment}
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
