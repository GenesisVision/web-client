import { TFunction } from "i18next";
import { api, Token } from "services/api-client/swagger-custom-client";
import { number, object, string } from "yup";

export type DemoDepositResponse = Promise<void>;

export const depositToDemo = ({ id, amount }: any): DemoDepositResponse => {
  return (api.assets(Token.create()).makeDemoTradingAccountDeposit(id, {
    body: { amount, id }
  }) as unknown) as DemoDepositResponse;
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
