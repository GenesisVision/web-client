import {
  emailValidator,
  passwordValidator
} from "shared/utils/validators/validators";
import { boolean, object, ref, string } from "yup";

const confirmPasswordValidator = string()
  .oneOf([ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");

const validationSchema = object().shape({
  email: emailValidator,
  password: passwordValidator,
  acceptTerms: boolean().oneOf([true], "Must Accept the Terms of Service"),
  privacyPolicy: boolean().oneOf([true], "Must Accept the Privacy Policy"),
  residentUSA: boolean().oneOf(
    [true],
    "Must confirm that you are not a resident of the USA"
  ),
  confirmPassword: confirmPasswordValidator
});

export default validationSchema;
