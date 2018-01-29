import Yup from "yup";

const emailValidator = Yup.string()
  .email("Invalid email address")
  .required("Email is required!");

const passwordValidator = Yup.string()
  .min(6, "Password is weak.")
  .required("First name is required.");

const validationSchema = Yup.object().shape({
  email: emailValidator,
  password: passwordValidator
});

export default validationSchema;
