import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "src";
import Header from "src/components/Header/Header";
import Snackbar from "src/components/Snackbar/Snackbar";
import bodySvg from "src/img/body.svg";
import "./style.scss";

const Authorization = () => {
  const [snackbarActive, setSnackbarActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  const store = useContext(Context);

  const showSnackbar = (message) => {
    setSnackbarActive(true);
    setErrorMessage(message);
  };

  const authorizationUser = async () => {
    if (userData.login.trim() === "" || userData.password.trim() === "") {
      showSnackbar("Поля не должны быть пустыми");
      return;
    }
    const response = await store.authorization(
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
    <div className="authorization">
      <Snackbar
        snackbarActive={snackbarActive}
        setSnackbarActive={setSnackbarActive}
        errorMessage={errorMessage}
      />
      <Header title={"Войти в систему"} />
      <div className="body">
        <img
          src={bodySvg}
          alt="Логотип больницы"
          className="logo"
        />
        <div className="user-panel">
          <h2 className="user-panel__title text-style">Войти в систему</h2>
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
            <div className="user-panel__group-button">
              <button
                type="button"
                className="user-panel__button user-panel__text"
                onClick={authorizationUser}
              >
                Войти
              </button>
              <Link to="/registration" className="user-panel__text">
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
