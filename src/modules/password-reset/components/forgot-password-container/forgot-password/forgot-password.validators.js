import { object } from "yup";

import { emailValidator } from "../../../../../shared/utils/validators/validators";

const validationSchema = object().shape({
  email: emailValidator
});

export default validationSchema;
