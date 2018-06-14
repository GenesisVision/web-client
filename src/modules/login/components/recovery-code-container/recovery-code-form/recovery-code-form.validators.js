import { object, string } from "yup";

const validationSchema = object().shape({
  recoveryCode: string()
    .trim()
    .required("Recovery code is required.")
});

export default validationSchema;
