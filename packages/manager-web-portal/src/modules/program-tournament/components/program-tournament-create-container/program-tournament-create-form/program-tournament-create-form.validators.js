import Yup from "yup";

const validateSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
});

export default validateSchema;
