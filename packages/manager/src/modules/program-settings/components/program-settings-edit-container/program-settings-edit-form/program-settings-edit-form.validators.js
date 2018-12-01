import { object, string } from "yup";

const programSettingsEditFormValidationSchema = object().shape({
  title: string().required("Title is required"),
  description: string()
});

export default programSettingsEditFormValidationSchema;
