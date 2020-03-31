import { api, Token } from "services/api-client/swagger-custom-client";

const enableAutoJoin = (id: string) => api.investments().switchAutoJoinOn(id);

const disableAutoJoin = (id: string) => api.investments().switchAutoJoinOff(id);

export const toggleAutoJoin = ({
  id,
  isAutoJoin
}: {
  id: string;
  isAutoJoin: boolean;
}) => (isAutoJoin ? enableAutoJoin(id) : disableAutoJoin(id));
