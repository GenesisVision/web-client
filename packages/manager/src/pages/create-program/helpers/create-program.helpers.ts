import { Broker, BrokerAccountType } from "gv-api-web";
import managerAvatar from "shared/media/manager-avatar.png";

export const getAccountTypes = (broker: Broker) =>
  broker.accountTypes.map(accountType => accountType.type);

export const getAccountType = (
  broker: Broker,
  type: string
): BrokerAccountType | undefined =>
  broker.accountTypes.find(accountType => accountType.type === type);

export const getLeverages = (broker: Broker, type: string): number[] => {
  let result: number[];
  let accountType = getAccountType(broker, type);

  if (accountType) {
    result = accountType.leverages;
  } else {
    result = [];
  }
  return result;
};

export const getCurrencies = (broker: Broker, type: string): string[] => {
  let result: string[];
  let accountType = getAccountType(broker, type);

  if (accountType) {
    result = accountType.currencies;
  } else {
    result = [];
  }
  return result;
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
