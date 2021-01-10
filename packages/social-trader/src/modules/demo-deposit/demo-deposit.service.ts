import { api } from "services/api-client/swagger-custom-client";

export type DemoDepositResponse = Promise<void>;

export const depositToDemo = ({ id, amount }: any): DemoDepositResponse => {
  return (api.assets().makeDemoTradingAccountDeposit(id, {
    body: { amount }
  }) as unknown) as DemoDepositResponse;
};

export enum DEMO_DEPOSIT_FORM_FIELDS {
  amount = "amount"
}

export interface IDemoDepositFormValues {
  [DEMO_DEPOSIT_FORM_FIELDS.amount]: string;
}
