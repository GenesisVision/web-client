import { api, Token } from "services/api-client/swagger-custom-client";

const enableAutoJoin = (id: string) =>
  api.investments(Token.create()).switchAutoJoinOn(id);

const disableAutoJoin = (id: string) =>
  api.investments(Token.create()).switchAutoJoinOff(id);

export const toggleAutoJoin = ({
  id,
  isAutoJoin
}: {
  id: string;
  isAutoJoin: boolean;
}) => (isAutoJoin ? enableAutoJoin(id) : disableAutoJoin(id));
