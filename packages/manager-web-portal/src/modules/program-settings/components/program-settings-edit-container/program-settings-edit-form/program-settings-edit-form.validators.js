import Yup from "yup";

const programSettingsEditFormValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
});

export default programSettingsEditFormValidationSchema;
