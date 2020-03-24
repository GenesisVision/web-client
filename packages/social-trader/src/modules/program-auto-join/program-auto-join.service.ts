import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";

const enableAutoJoin = (id: string) =>
  investmentsApi.switchAutoJoinOn(id, authService.getAuthArg());

const disableAutoJoin = (id: string) =>
  investmentsApi.switchAutoJoinOff(id, authService.getAuthArg());

export const toggleAutoJoin = ({
  id,
  isAutoJoin
}: {
  id: string;
  isAutoJoin: boolean;
}) => (isAutoJoin ? enableAutoJoin(id) : disableAutoJoin(id));
