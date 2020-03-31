import { TFunction } from "i18next";
import { passwordValidator } from "utils/validators/validators";
import { object, ref, string } from "yup";

import { PASSWORD_CHANGE_FORM_FIELDS } from "./password-change-form";

export const passwordChangeValidationSchema = (t: TFunction) =>
  object().shape({
    [PASSWORD_CHANGE_FORM_FIELDS.oldPassword]: string().required(
      t("Password is required")
    ),
    [PASSWORD_CHANGE_FORM_FIELDS.password]: passwordValidator(t),
    [PASSWORD_CHANGE_FORM_FIELDS.confirmPassword]: string()
      .oneOf(
        [ref(PASSWORD_CHANGE_FORM_FIELDS.password)],
        t("Passwords don't match.")
      )
      .required(t("Confirm Password is required"))
  });
