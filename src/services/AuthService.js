import $api from "src/http/index";

const authorization = (login, password) => {
  return $api.post("/authorization", { login, password });
};

const registration = (login, password) => {
  return $api.post("/registration", { login, password });
};

const logout = () => {
  return $api.get("/logout");
};

export { 
  authorization,
  registration,
  logout,
};
