import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";

const enableReinvesting = (id: string) =>
  investmentsApi.switchReinvestOn(id, authService.getAuthArg());

const disableReinvesting = (id: string) =>
  investmentsApi.switchReinvestOff(id, authService.getAuthArg());

export const toggleReinvesting = ({
  id,
  isReinvesting
}: {
  id: string;
  isReinvesting: boolean;
}) => (isReinvesting ? enableReinvesting(id) : disableReinvesting(id));
