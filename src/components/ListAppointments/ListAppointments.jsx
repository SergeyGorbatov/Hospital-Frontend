import OneAppointment from "src/components/OneAppointment/OneAppointment";
import { tableTitles } from "src/constants";
import "./style.scss";

const ListAppointments = ({
  appointments,
  editAppointmentActive,
  deleteAppointmentActive,
}) => {
  return (
    <table className="list-appointments">
      <thead className="list-appointments__titles">
        <tr className="list-appointments__titles">
          {tableTitles.map((item) => {
            return (
              <th
                className="list-appointments__title-patient"
                key={item.uniqueKey}
              >
                {item.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="list-appointments__body">
        {appointments.map((appointment) => (
          <OneAppointment
            appointment={appointment}
            key={appointment._id}
            editAppointmentActive={() => editAppointmentActive(appointment)}
            deleteAppointmentActive={() => deleteAppointmentActive(appointment)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ListAppointments;
