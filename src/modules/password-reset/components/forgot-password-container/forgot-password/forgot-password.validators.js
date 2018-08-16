import { emailValidator } from "shared/utils/validators/validators";
import { object } from "yup";

const validationSchema = object().shape({
  email: emailValidator
});

export default validationSchema;
