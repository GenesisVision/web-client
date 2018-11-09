import { string } from "yup";

export const emailValidator = string()
  .email("Invalid email address.")
  .required("Email is required.");

export const passwordValidator = string()
  .min(8, "Password is weak.")
  .required("Password is required.");

export const ethWalletValidator = string()
  .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid eth wallet address")
  .required("Wallet is required.");
