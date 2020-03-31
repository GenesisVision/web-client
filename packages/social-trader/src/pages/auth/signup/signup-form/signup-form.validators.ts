import i18next from "i18next";
import { emailValidator, passwordValidator } from "utils/validators/validators";
import { boolean, object, ref, string } from "yup";

const confirmPasswordValidator = string()
  .oneOf([ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");

export enum SIGN_UP_FORM_FIELDS {
  utmSource = "utmSource",
  captchaCheckResult = "captchaCheckResult",
  refCode = "refCode",
  userName = "userName",
  email = "email",
  password = "password",
  privacyPolicy = "privacyPolicy",
  acceptTerms = "acceptTerms",
  isAuto = "isAuto"
}

const validationSchema = (t: i18next.TFunction) =>
  object().shape({
    [SIGN_UP_FORM_FIELDS.userName]: string()
      .matches(
        /^[-A-Za-z0-9]{1,99}$/,
        "Must contain from 1 to 99 letters, numbers or dashes"
      )
      .required("Name is required"),
    [SIGN_UP_FORM_FIELDS.email]: emailValidator,
    [SIGN_UP_FORM_FIELDS.password]: passwordValidator(t),
    [SIGN_UP_FORM_FIELDS.acceptTerms]: boolean().oneOf(
      [true],
      "Must Accept the Terms of Service"
    ),
    [SIGN_UP_FORM_FIELDS.privacyPolicy]: boolean().oneOf(
      [true],
      "Must Accept the Privacy Policy"
    )
  });

export default validationSchema;
