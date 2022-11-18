const validLogin = /^[a-zA-Z0-9_-]{6,}$/;
const validPassword = /^(?=.*[A-z])(?=.*[0-9])[a-zA-z0-9].{6,}$/;

const checkValidationLogin = (login) => {
  return validLogin.test(login);
};

const checkValidationPassword = (password) => {
  return validPassword.test(password);
};

const checkPasswordsEquality = (password, repeatPassword) => {
  return password === repeatPassword;
};

export {
  checkValidationLogin,
  checkValidationPassword,
  checkPasswordsEquality,
};
