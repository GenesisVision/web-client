import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";

export type DemoDepositResponse = Promise<void>;

export const depositToDemo = ({ id, amount }: any): DemoDepositResponse => {
  return (assetsApi.makeDemoTradingAccountDeposit(
    id,
    authService.getAuthArg(),
    {
      model: { amount }
    }
  ) as unknown) as DemoDepositResponse;
};
