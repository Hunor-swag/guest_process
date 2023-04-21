type TextObject = {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordInvalid: string;
  passwordsDontMatch: string;
};

export const validateEmail = (email: string, text: TextObject) => {
  let error = "";
  if (email === "") {
    error = text.emailRequired;
  } else if (!email.match(/^\S+@\S+\.\S+$/)) {
    error = text.emailInvalid;
  }
  return error;
};

export const validateSecondPassword = (
  secondPassword: string,
  password: string,
  text: TextObject
) => {
  let error = "";
  if (secondPassword !== password) error = text.passwordsDontMatch;
  return error;
};

export const passwordEntered = (password: string, text: TextObject) => {
  return password === "" ? text.passwordRequired : "";
};

export const validatePassword = (password: string, text: TextObject) => {
  let error = "";
  if (password === "") error = text.passwordRequired;
  else if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/gm
    )
  ) {
    error = text.passwordInvalid;
  }
  return error;
};
