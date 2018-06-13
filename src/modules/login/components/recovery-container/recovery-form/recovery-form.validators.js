import { object, string } from "yup";

const validationSchema = object().shape({
  recovery: string().required("Recovery code is required.")
});

export default validationSchema;
