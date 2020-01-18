import Router from "next/router";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";

export const cancelChangeBrokerMethod = (programId: string) =>
  assetsApi.cancelChangeBroker(programId, authService.getAuthArg());

export const changeBrokerMethod = (props: {
  id: string;
  brokerAccountTypeId: string;
  leverage: number;
}) => {
  return assetsApi.changeBroker(props.id, authService.getAuthArg(), {
    body: {
      newBrokerAccountTypeId: props.brokerAccountTypeId,
      newLeverage: props.leverage
    }
  });
};
export const redirectToProgram = (id: string) => {
  Router.replace(`${PROGRAMS_ROUTE}/${id}`);
};
