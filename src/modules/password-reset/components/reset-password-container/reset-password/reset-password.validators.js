import Yup from "yup";

import { passwordValidator } from "../../../../../shared/utils/validators/validators";

const confirmPasswordValidator = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");

const validationSchema = Yup.object().shape({
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator
});

export default validationSchema;
