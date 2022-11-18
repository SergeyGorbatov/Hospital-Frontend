import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Snackbar from "src/components/Snackbar/Snackbar";
import {
  checkValidationLogin,
  checkValidationPassword,
  checkPasswordsEquality,
} from "src/helpers/validations";
import bodySvg from "src/img/body.svg";
import "./style.scss";

const Registration = () => {
  const [snackbarActive, setSnackbarActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });

  const store = useContext(Context);

  const showSnackbar = (message) => {
    setSnackbarActive(true);
    setErrorMessage(message);
  };

  const registrationUser = async () => {
    const checkLogin = checkValidationLogin(userData.login);
    if (!checkLogin) {
      showSnackbar(`Логин должен содержать не менее 6 символов.`);
      return;
    }

    const checkPassword = checkValidationPassword(userData.password);
    if (!checkPassword) {
      showSnackbar(`Пароль должен содержать не менее 6 символов, латинские буквы и минимум 1 цифру.`);
      return;
    }

    const checkPasswords = checkPasswordsEquality(
      userData.password,
      userData.repeatPassword
    );
    if (!checkPasswords) {
      showSnackbar("Пароли должны совпадать");
      return;
    }

    const response = await store.registration(
      userData.login,
      userData.password
    );
    if (!response.data) {
      showSnackbar(response);
      return;
    }
  };

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="registration">
      <Snackbar
        snackbarActive={snackbarActive}
        setSnackbarActive={setSnackbarActive}
        errorMessage={errorMessage}
      />
      <Header title={"Зарегистрироваться в системе"} />
      <div className="body">
        <img 
          src={bodySvg}
          alt="Логотип больницы"
          className="logo"
        />
        <div className="user-panel">
          <h2 className="user-panel__title text-style">Регистрация</h2>
          <form className="user-panel__form">
            <label className="user-panel__text" htmlFor="input-login">
              Логин:
            </label>
            <input
              id="input-login"
              type="text"
              className="user-panel__input"
              placeholder="Логин"
              value={userData.login}
              onChange={(event) => handleChange("login", event.target.value)}
            />
            <label className="user-panel__text" htmlFor="input-password">
              Пароль:
            </label>
            <input
              id="input-password"
              type="text"
              className="user-panel__input"
              placeholder="Пароль"
              value={userData.password}
              onChange={(event) => handleChange("password", event.target.value)}
            />
            <label className="user-panel__text" htmlFor="input-repeat-password">
              Повторите пароль:
            </label>
            <input
              id="input-repeat-password"
              type="text"
              className="user-panel__input"
              placeholder="Пароль"
              value={userData.repeatPassword}
              onChange={(event) =>
                handleChange("repeatPassword", event.target.value)
              }
            />
            <div className="user-panel__group-button">
              <button
                type="button"
                className="user-panel__button user-panel__text"
                onClick={registrationUser}
              >
                Зарегистрироваться
              </button>
              <Link to="/authorization" className="user-panel__text">
                Авторизоваться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
