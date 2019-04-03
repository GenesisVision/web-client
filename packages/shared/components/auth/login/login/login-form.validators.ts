import { emailValidator } from "shared/utils/validators/validators";
import { object, string } from "yup";

const validationSchema = object().shape({
  email: emailValidator,
  password: string().required("Password is required.")
});

export default validationSchema;
