import { useState } from "react";
import Modal from "src/components/Modal/Modal";
import { doctors } from "src/constants";
import moment from "moment/moment";
import "./style.scss";

const EditAppointment = ({
  copyAppointment,
  setModalEditActive,
  saveOneAppointment,
}) => {
  const [appointmentDataEdit, setappointmentDataEdit] = useState({
    patient: copyAppointment.patient,
    doctor: copyAppointment.doctor,
    date: moment(copyAppointment.date).format("YYYY-MM-DD"),
    complaint: copyAppointment.complaint,
    _id: copyAppointment._id,
  });

  const cancelAppointment = () => {
    setModalEditActive(false);
  };

  const disabledButton = !(
    appointmentDataEdit.patient &&
    appointmentDataEdit.doctor &&
    appointmentDataEdit.date &&
    appointmentDataEdit.complaint
  );

  const handleChange = (name, value) => {
    setappointmentDataEdit({
      ...appointmentDataEdit,
      [name]: value,
    });
  };

  return (
    <Modal
      headerName={"Изменить приём"}
      buttonSaveName={"Сохранить"}
      cancelAppointment={cancelAppointment}
      closedAppointment={() => saveOneAppointment(appointmentDataEdit)}
      disabledButton={disabledButton}
    >
      <div className="edit-appointment">
        <form className="form">
          <div className="form__group-input">
            <label className="form__text" htmlFor="input-patient">
              Имя:
            </label>
            <input
              id="input-patient"
              type="text"
              className="form__input"
              value={appointmentDataEdit.patient}
              onChange={(event) => handleChange("patient", event.target.value)}
            />
          </div>
          <div className="form__group-input">
            <label className="form__text" htmlFor="input-doctor">
              Врач:
            </label>
            <select
              id="input-doctor"
              className="form__input"
              value={appointmentDataEdit.doctor}
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
          <div className="form__group-input">
            <label className="form__text" htmlFor="input-date">
              Дата:
            </label>
            <input
              id="input-date"
              type="date"
              className="form__input"
              value={appointmentDataEdit.date}
              onChange={(event) => handleChange("date", event.target.value)}
            />
          </div>
          <div className="form__group-input">
            <label className="form__text" htmlFor="input-complaint">
              Жалобы:
            </label>
            <textarea
              id="input-complaint"
              type="text"
              className="form__textarea"
              rows="10"
              value={appointmentDataEdit.complaint}
              onChange={(event) =>
                handleChange("complaint", event.target.value)
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditAppointment;
