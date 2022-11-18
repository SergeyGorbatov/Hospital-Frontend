import "./style.scss";

const Modal = ({
  children,
  headerName,
  cancelAppointment,
  disabledButton,
  closedAppointment,
  buttonSaveName,
}) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">{headerName}</div>
        {children}
        <div className="modal__footer">
          <button
            type="button"
            className="footer__button form__text"
            onClick={cancelAppointment}
          >
            Отмена
          </button>
          <button
            type="button"
            className="footer__button button-save_color form__text"
            disabled={disabledButton}
            onClick={closedAppointment}
          >
            {buttonSaveName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
