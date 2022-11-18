import axios from "axios";
import { authorization, registration, logout } from "src/services/AuthService";
import {
  createAppointment,
  getAppointments,
  editAppointment,
  deleteAppointment,
} from "src/services/appointmentsService";
import { URL } from "src/constants";

export class Store {
  user = {};
  isAuth = false;
  event = [];

  subscribe(callback) {
    if (!this.event) {
      this.event = [];
    }

    this.event.push(callback);
  }

  publish(data) {
    if (!this.event) {
      return;
    }

    this.event.forEach((subscriberCallback) => subscriberCallback(data));
  }

  setAuth(bool) {
    this.isAuth = bool;
    this.publish(this.isAuth);
  }

  setUser(user) {
    this.user = user;
  }

  async authorization(login, password) {
    try {
      const response = await authorization(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
      return error.response?.data?.message;
    }
  }

  async registration(login, password) {
    try {
      const response = await registration(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
      return error.response?.data?.message;
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      return error.response?.data?.message;
    }
  }

  async checkAuth() {
    try {
      if (localStorage.getItem("token")) {
        const response = await axios.get(`${URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
      } else {
        this.setAuth(false);
        this.setUser({});
      }
    } catch (error) {
      return error.response?.data?.message;
    }
  }

  async getAllAppointments() {
    try {
      const response = await getAppointments();
      return response;
    } catch (error) {
      return error.response?.data?.errors?.msg;
    }
  }

  async addAppointment(patient, doctor, date, complaint) {
    try {
      const response = await createAppointment(
        patient,
        doctor,
        date,
        complaint
      );

      return response;
    } catch (error) {
      return error.response?.data?.errors?.msg;
    }
  }

  async saveAppointment(appointmentDataEdit) {
    try {
      const response = await editAppointment(
        appointmentDataEdit.patient,
        appointmentDataEdit.doctor,
        appointmentDataEdit.date,
        appointmentDataEdit.complaint,
        appointmentDataEdit._id
      );

      return response;
    } catch (error) {
      return error.response?.data?.errors?.msg;
    }
  }

  async deleteOneAppointment(_id) {
    try {
      const response = await deleteAppointment(_id);
      return response;
    } catch (error) {
      return error.response?.data?.errors?.msg;
    }
  }
}
