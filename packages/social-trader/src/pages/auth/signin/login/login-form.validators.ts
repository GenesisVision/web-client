import { TFunction } from "i18next";
import { emailValidator, passwordValidator } from "utils/validators/validators";
import { object } from "yup";

const validationSchema = (t: TFunction) =>
  object().shape({
    email: emailValidator,
    password: passwordValidator(t)
  });

export default validationSchema;
