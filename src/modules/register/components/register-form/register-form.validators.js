import Yup from "yup";

import {
  emailValidator,
  passwordValidator
} from "../../../../shared/utils/validators/validators";

/*const confirmPasswordValidator = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords don't match.")
  .required("Confirm Password is required");*/

const validationSchema = Yup.object().shape({
  email: emailValidator,
  password: passwordValidator /*,
  confirmPassword: confirmPasswordValidator*/
});

export default validationSchema;
