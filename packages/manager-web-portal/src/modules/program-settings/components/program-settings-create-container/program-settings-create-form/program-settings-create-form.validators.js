import { object, string, number, ref } from "yup";

const programSettingsCreateFormValidationSchema = object().shape({
  tradePlatformPassword: string()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,15}$/,
      "Password must be from 8 to 15 chars and numbers. It must include at least one char and at least one number. Special Characters are not supported (e.g. !, @, $)."
    )
    .max(16, "Password is very long")
    .required("Password is required"),
  confirmTradePlatformPassword: string()
    .oneOf([ref("tradePlatformPassword")], "Passwords don't match.")
    .required("Confirm Password is required"),
  brokerTradeServerId: string().required("Server is required"),
  leverage: string().required("Leverage is required"),
  title: string().required("Title is required"),
  description: string(),
  depositAmount: number()
    .typeError("Deposit Amount must be a number")
    .positive("Deposit Amount must be a positive number")
    .required("Deposit Amount is required"),
  tokenName: string().required("Token Name is required"),
  tokenSymbol: string().required("Token Symbol is required"),
  period: string().required("Period is required"),
  dateFrom: object().nullable(),
  feeSuccess: number()
    .typeError("Success Fee must be a number")
    .positive("Success Fee must be a positive number"),
  feeManagement: number()
    .typeError("Management Fee must be a number")
    .positive("Management Feet must be a positive number")
});

export default programSettingsCreateFormValidationSchema;
