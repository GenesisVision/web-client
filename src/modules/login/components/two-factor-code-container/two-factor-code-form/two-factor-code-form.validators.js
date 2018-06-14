import { object, string } from "yup";

const validationSchema = object().shape({
  twoFactorCode: string()
    .trim()
    .matches(/^\d{6}$/, "Authentication code should contain 6 digits.")
    .required("Authentication code is required.")
});

export default validationSchema;
