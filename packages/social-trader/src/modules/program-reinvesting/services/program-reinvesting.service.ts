import { api, Token } from "services/api-client/swagger-custom-client";

const enableReinvesting = (id: string) =>
  api.investments(Token.create()).switchReinvestOn(id);

const disableReinvesting = (id: string) =>
  api.investments(Token.create()).switchReinvestOff(id);

export const toggleReinvesting = ({
  id,
  isReinvesting
}: {
  id: string;
  isReinvesting: boolean;
}) => (isReinvesting ? enableReinvesting(id) : disableReinvesting(id));
