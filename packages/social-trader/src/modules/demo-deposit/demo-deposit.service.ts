import { TFunction } from "i18next";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import { number, object, string } from "yup";

export type DemoDepositResponse = Promise<void>;

export const depositToDemo = ({ id, amount }: any): DemoDepositResponse => {
  return (assetsApi.makeDemoTradingAccountDeposit(
    id,
    authService.getAuthArg(),
    {
      body: { amount }
    }
  ) as unknown) as DemoDepositResponse;
};

export enum DEMO_DEPOSIT_FORM_FIELDS {
  amount = "amount"
}

export interface IDemoDepositFormValues {
  [DEMO_DEPOSIT_FORM_FIELDS.amount]: string;
}

export const DemoDepositValidationSchema = (t: TFunction, maxAmount: number) =>
  object().shape({
    [DEMO_DEPOSIT_FORM_FIELDS.amount]: number()
      .required(t("demo-deposit.validations.required"))
      .max(maxAmount, t("demo-deposit.validations.max-amount", { maxAmount }))
  });
