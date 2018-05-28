import { object, number } from "yup";

import { ethWalletValidator } from "../../../../../shared/utils/validators/validators";

const walletWithdrawValidationSchema = object().shape({
  address: ethWalletValidator,
  amount: number()
    .typeError("Amount must be a number.")
    .moreThan(0, "Amount must be greater than zero")
    .required("Amount is required.")
});

export default walletWithdrawValidationSchema;
