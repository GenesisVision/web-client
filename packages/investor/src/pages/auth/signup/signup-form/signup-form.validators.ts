import {
  emailValidator,
  passwordValidator
} from "shared/utils/validators/validators";
import { boolean, object, ref, string } from "yup";

import { SIGNUP_FORM_FIELDS } from "./signup-form.types";

const confirmPasswordValidator = string()
  .oneOf([ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");

const validationSchema = object().shape({
  [SIGNUP_FORM_FIELDS.email]: emailValidator,
  [SIGNUP_FORM_FIELDS.password]: passwordValidator,
  [SIGNUP_FORM_FIELDS.acceptTerms]: boolean().oneOf(
    [true],
    "Must Accept the Terms of Service"
  ),
  [SIGNUP_FORM_FIELDS.privacyPolicy]: boolean().oneOf(
    [true],
    "Must Accept the Privacy Policy"
  ),
  [SIGNUP_FORM_FIELDS.residentUSA]: boolean().oneOf(
    [true],
    "Must confirm that you are not a resident of the USA"
  ),
  [SIGNUP_FORM_FIELDS.confirmPassword]: confirmPasswordValidator
});

export default validationSchema;
