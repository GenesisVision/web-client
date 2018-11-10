import { object, string } from "yup";

const validateSchema = object().shape({
  title: string().required("Title is required"),
  description: string()
});

export default validateSchema;
