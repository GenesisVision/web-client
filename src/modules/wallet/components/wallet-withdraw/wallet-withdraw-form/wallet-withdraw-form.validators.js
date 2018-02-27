import Yup from "yup";

import { ethWalletValidator } from "../../../../../shared/utils/validators/validators";

const walletWithdrawValidationSchema = Yup.object().shape({
  address: ethWalletValidator,
  amount: Yup.number()
    .typeError("Amount must be a number.")
    .moreThan(0, "Amount must be greater than zero")
    .required("Amount is required.")
});

export default walletWithdrawValidationSchema;
