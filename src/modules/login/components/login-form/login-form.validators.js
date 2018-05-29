import { object } from "yup";

import {
  emailValidator,
  passwordValidator
} from "../../../../shared/utils/validators/validators";

const validationSchema = object().shape({
  email: emailValidator,
  password: passwordValidator
});

export default validationSchema;
