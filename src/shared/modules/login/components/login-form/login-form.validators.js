import Yup from "yup";
import {
  emailValidator,
  passwordValidator
} from "../../../../utils/validators/validators";

const validationSchema = Yup.object().shape({
  email: emailValidator,
  password: passwordValidator
});

export default validationSchema;
