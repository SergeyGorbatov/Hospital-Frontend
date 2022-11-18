import Modal from "src/components/Modal/Modal";
import "./style.scss";

const DeleteAppointment = ({
  setModalDeleteActive,
  deleteAppointment,
  copyAppointment,
}) => {
  const cancelAppointment = () => {
    setModalDeleteActive(false);
  };

  return (
    <Modal
      closedAppointment={() => deleteAppointment(copyAppointment._id)}
      cancelAppointment={cancelAppointment}
      headerName={"Удалить приём"}
      buttonSaveName={"Удалить"}
    >
      <div className="delete-appointment">
        Вы действительно хотите удалить приём?
      </div>
    </Modal>
  );
};

export default DeleteAppointment;
