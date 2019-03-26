import { Broker, BrokerAccountType } from "gv-api-web";
import managerAvatar from "shared/media/manager-avatar.png";

/*export const getAccountTypes = (broker: Broker) =>
  broker.accountTypes.map(accountType => accountType.type);
*/
export const getAccountType = (
  broker: Broker,
  type: string
): BrokerAccountType | undefined =>
  broker.accountTypes.find(accountType => accountType.type === type);

export const getLeverages = (accountType?: BrokerAccountType): number[] => {
  if (!accountType) {
    return [];
  }
  return accountType.leverages;
};

export const getCurrencies = (accountType?: BrokerAccountType): string[] => {
  if (!accountType) {
    return [];
  }
  return accountType.currencies;
};

export const checkIsModelFilled = (values: any) => {
  if (values.logo && values.logo.src !== managerAvatar) {
    return true;
  }
  let valuesToCheck = { ...values, logo: null };

  for (var fieldName in valuesToCheck) {
    if (valuesToCheck[fieldName]) {
      return true;
    }
  }
};
