import Yup from "yup";

export const emailValidator = Yup.string()
  .email("Invalid email address.")
  .required("Email is required.");

export const passwordValidator = Yup.string()
  .min(6, "Password is weak.")
  .required("Password is required.");
