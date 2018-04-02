import Yup from "yup";

import { emailValidator } from "../../../../../shared/utils/validators/validators";

const validationSchema = Yup.object().shape({
  email: emailValidator
});

export default validationSchema;
