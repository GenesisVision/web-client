import { object, string, ref } from "yup";

import { passwordValidator } from "../../../../../shared/utils/validators/validators";

const confirmPasswordValidator = string()
  .oneOf([ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");

const validationSchema = object().shape({
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator
});

export default validationSchema;
