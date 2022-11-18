import { useState, useEffect, useContext } from "react";
import { Context } from "src";
import Header from "src/components/Header/Header";
import CreateAppointment from "src/components/CreateAppointment/CreateAppointment";
import ListAppointments from "src/components/ListAppointments/ListAppointments";
import EditAppointment from "src/components/EditAppointment/EditAppointment";
import DeleteAppointment from "src/components/DeleteAppointment/DeleteAppointment";
import Snackbar from "src/components/Snackbar/Snackbar";
import SortingAppointments from "src/components/SortingAppointments/SortingAppointments";
import FilterAppointments from "src/components/FilterAppointments/FilterAppointments";
import { filterFrom, filterTo, filterFromTo } from "src/helpers/filter";
import { sortPatient, sortDoctor, sortDate } from "src/helpers/sorting";
import "./style.scss";

const Appointments = () => {
  const [snackbarActive, setSnackbarActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [appointmentFilter, setAppointmentFilter] = useState([]);
  const [activeFiltering, setActiveFiltering] = useState(false);
  const [modalEditActive, setModalEditActive] = useState(false);
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [copyAppointment, setCopyAppointment] = useState({
    patient: "",
    doctor: "",
    date: "",
    complaint: "",
    _id: "",
  });

  const fromFilter = (date) => {
    const result = filterFrom(appointmentFilter, date);
    setAppointments(result);
  };
  const ToFilter = (date) => {
    const result = filterTo(appointmentFilter, date);
    setAppointments(result);
  };
  const fromToFilter = (date) => {
    const result = filterFromTo(appointmentFilter, date);
    setAppointments(result);
  };

  const reverseSorting = () => {
    const result = [...appointments].reverse();
    setAppointments(result);
  };

  const patientSorting = () => {
    const result = sortPatient([...appointments]);
    setAppointments(result);
  };

  const doctorSorting = () => {
    const result = sortDoctor([...appointments]);
    setAppointments(result);
  };

  const dateSorting = () => {
    const result = sortDate([...appointments]);
    setAppointments(result);
  };

  const store = useContext(Context);

  const logout = () => store.logout();

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    const response = await store.getAllAppointments();
    if (!response.data) {
      showSnackbar(response);
    }

    setAppointments(response.data);
    setAppointmentFilter(response.data);
  };

  const showSnackbar = (message) => {
    setSnackbarActive(true);
    setErrorMessage(message);
  };

  const addNewAppointment = async (patient, doctor, date, complaint) => {
    if (
      patient.trim() === "" ||
      doctor.trim() === "" ||
      date.trim() === "" ||
      complaint.trim() === ""
    ) {
      showSnackbar("Поля не должны быть пустыми");
      return;
    }

    const response = await store.addAppointment(
      patient,
      doctor,
      date,
      complaint
    );
    if (!response.data) {
      showSnackbar("Ошибка добавления приёма");
      return;
    }
    const newAppointment = response.data;
    setAppointments([newAppointment, ...appointments]);
  };

  const editAppointmentActive = (appointment) => {
    setModalEditActive(true);
    setCopyAppointment({
      patient: appointment.patient,
      doctor: appointment.doctor,
      date: appointment.date,
      complaint: appointment.complaint,
      _id: appointment._id,
    });
  };

  const deleteAppointmentActive = (appointment) => {
    setModalDeleteActive(true);
    setCopyAppointment({
      _id: appointment._id,
    });
  };

  const deleteAppointment = async (_id) => {
    await store.deleteOneAppointment(_id);
    const newAppointments = appointments.filter(
      (appointment) => appointment._id !== _id
    );
    setAppointments(newAppointments);
    setModalDeleteActive(false);
  };

  const saveOneAppointment = async (appointmentDataEdit) => {
    const response = await store.saveAppointment(appointmentDataEdit);
    const updatedAppointments = appointments.map((appointment) => {
      const newAppointment = { ...appointment };
      if (newAppointment._id === appointmentDataEdit._id) {
        newAppointment.patient = response.data.patient;
        newAppointment.doctor = response.data.doctor;
        newAppointment.date = response.data.date;
        newAppointment.complaint = response.data.complaint;
      }

      return newAppointment;
    });
    setAppointments(updatedAppointments);
    setModalEditActive(false);
  };

  return (
    <div className="appointments">
      <Snackbar
        snackbarActive={snackbarActive}
        setSnackbarActive={setSnackbarActive}
        errorMessage={errorMessage}
      />
      <Header title={"Приёмы"}>
        <button
          type="button"
          className="header__logout"
          onClick={logout}
        >
          Выйти
        </button>
      </Header>
      <CreateAppointment addNewAppointment={addNewAppointment} />
      <div
        className={
          activeFiltering
            ? "sorting-and-filter active-filter"
            : "sorting-and-filter"
        }
      >
        <SortingAppointments
          patientSorting={patientSorting}
          reverseSorting={reverseSorting}
          doctorSorting={doctorSorting}
          dateSorting={dateSorting}
          resetSorting={getAppointments}
        />
        <FilterAppointments
          openFiltering={setActiveFiltering}
          activeFiltering={activeFiltering}
          fromFilter={fromFilter}
          toFilter={ToFilter}
          fromToFilter={fromToFilter}
          resetFiltering={getAppointments}
        />
      </div>
      <ListAppointments
        appointments={appointments}
        editAppointmentActive={editAppointmentActive}
        deleteAppointmentActive={deleteAppointmentActive}
      />
      {modalEditActive && (
        <EditAppointment
          copyAppointment={copyAppointment}
          setModalEditActive={setModalEditActive}
          saveOneAppointment={saveOneAppointment}
        />
      )}
      {modalDeleteActive && (
        <DeleteAppointment
          copyAppointment={copyAppointment}
          setModalDeleteActive={setModalDeleteActive}
          deleteAppointment={deleteAppointment}
        />
      )}
    </div>
  );
};

export default Appointments;
