import {
  emailValidator,
  passwordValidator
} from "shared/utils/validators/validators";
import { boolean, object, ref, string } from "yup";

const confirmPasswordValidator = string()
  .oneOf([ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");

const validationSchema = object().shape({
  userName: string()
    .matches(
      /^[-A-Za-z0-9]{1,99}$/,
      "Name must contain from 1 to 99 letters, numbers or dashes"
    )
    .required("Name is required"),
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: confirmPasswordValidator,
  acceptTerms: boolean().oneOf([true], "Must Accept the Terms of Service"),
  privacyPolicy: boolean().oneOf([true], "Must Accept the Privacy Policy")
});

export default validationSchema;
