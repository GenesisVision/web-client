import { passwordValidator } from "shared/utils/validators/validators";
import { object, ref, string } from "yup";

const confirmPasswordValidator = string()
  .oneOf([ref("password")], "Passwords don't match.")
  .required("Confirm password is required");

const validationSchema = object().shape({
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator
});

export default validationSchema;
