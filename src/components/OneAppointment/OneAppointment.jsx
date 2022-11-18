import moment from "moment/moment";
import editSvg from "src/img/edit.svg";
import deleteSvg from "src/img/delete.svg";
import "./style.scss";

const OneAppointment = ({
  appointment,
  editAppointmentActive,
  deleteAppointmentActive,
}) => {
  return (
    <tr className="appointment">
      <td className="appointment__text">{appointment.patient}</td>
      <td className="appointment__text">{appointment.doctor}</td>
      <td className="appointment__text">
        {moment(appointment.date).format("MM.DD.YYYY")}
      </td>
      <td className="appointment__text">{appointment.complaint}</td>
      <td className="appointment__text">
        <button type="button" onClick={editAppointmentActive}>
          <img
            src={editSvg}
            alt="Редактировать приём"
            className="appointment__logo"
          />
        </button>
        <button type="button" onClick={deleteAppointmentActive}>
          <img
            src={deleteSvg}
            alt="Удалить приём"
            className="appointment__logo"
          />
        </button>
      </td>
    </tr>
  );
};

export default OneAppointment;
