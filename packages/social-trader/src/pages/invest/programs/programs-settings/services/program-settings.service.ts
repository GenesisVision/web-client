import Router from "next/router";
import { PROGRAMS_ROUTE } from "routes/programs.routes";
import { api } from "services/api-client/swagger-custom-client";

export const cancelChangeBrokerMethod = (programId: string) =>
  api.assets().cancelChangeBroker(programId);

export const changeBrokerMethod = (props: {
  id: string;
  brokerAccountTypeId: string;
  leverage: number;
}) => {
  return api.assets().changeBroker(props.id, {
    body: {
      newBrokerAccountTypeId: props.brokerAccountTypeId,
      newLeverage: props.leverage
    }
  });
};
export const redirectToProgram = (id: string) => {
  Router.replace(`${PROGRAMS_ROUTE}/${id}`);
};
