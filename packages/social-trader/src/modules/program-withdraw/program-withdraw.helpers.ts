import { TFunction } from "i18next";

export enum WITHDRAW_FORM_FIELDS {
  amount = "amount",
  withdrawAll = "withdrawAll"
}

export interface IProgramWithdrawAmountFormValues {
  [WITHDRAW_FORM_FIELDS.amount]: number | string;
  [WITHDRAW_FORM_FIELDS.withdrawAll]: boolean;
}

export const depositAmountRules = ({
  t,
  watch,
  withdrawInPercent,
  availableToWithdraw
}: {
  t: TFunction;
  watch: () => IProgramWithdrawAmountFormValues;
  withdrawInPercent?: boolean;
  availableToWithdraw: number;
}) => {
  return {
    validate: (value: number) => {
      const { withdrawAll } = watch();
      if (withdrawAll) return true;
      const max = withdrawInPercent ? 100 : availableToWithdraw;
      if (value > max) return t("validations.amount-more-than-account-balance");
      if (value === 0) return t("validations.amount-is-zero");
      return true;
    }
  };
};
