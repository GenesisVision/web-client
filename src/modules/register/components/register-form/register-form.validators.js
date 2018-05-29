import { string, object, ref } from "yup";

import {
  emailValidator,
  passwordValidator
} from "../../../../shared/utils/validators/validators";

const confirmPasswordValidator = string()
  .oneOf([ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");

const validationSchema = object().shape({
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator
});

export default validationSchema;
