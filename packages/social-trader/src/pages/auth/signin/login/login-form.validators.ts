import i18next from "i18next";
import { emailValidator, passwordValidator } from "utils/validators/validators";
import { object } from "yup";

const validationSchema = (t: i18next.TFunction) =>
  object().shape({
    email: emailValidator,
    password: passwordValidator(t)
  });

export default validationSchema;
