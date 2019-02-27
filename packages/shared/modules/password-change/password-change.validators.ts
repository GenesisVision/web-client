import { InjectedTranslateProps } from "react-i18next";
import { passwordValidator } from "shared/utils/validators/validators";
import { object, ref, string } from "yup";

export const passwordChangeValidationSchema = ({ t }: InjectedTranslateProps) =>
  object().shape({
    oldPassword: string().required(t("Password is required")),
    password: passwordValidator,
    confirmPassword: string()
      .oneOf([ref("password")], t("Passwords don't match."))
      .required(t("Confirm Password is required"))
  });
