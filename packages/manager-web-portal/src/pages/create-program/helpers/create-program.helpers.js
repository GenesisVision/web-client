import managerAvatar from "shared/media/manager-avatar.png";
import { getNumberWithoutSuffix } from "shared/utils/helpers";

export const getDataWithoutSuffixes = (data, fields) => {
  let result = { ...data };

  fields.forEach(fieldName => {
    let field = result[fieldName];

    if (field) {
      field = getNumberWithoutSuffix(field);

      result[fieldName] = field;
    }
  });

  return result;
};

export const getAccountTypes = broker =>
  broker.accountTypes.map(accountType => accountType.type);

export const getAccountType = (broker, type) =>
  broker.accountTypes.find(accountType => accountType.type === type);

export const getLeverages = (broker, type) => {
  let result;
  let accountType = getAccountType(broker, type);

  if (accountType) {
    result = accountType.leverages;
  } else {
    result = [];
  }
  return result;
};

export const getCurrencies = (broker, type) => {
  let result;
  let accountType = getAccountType(broker, type);

  if (accountType) {
    result = accountType.currencies;
  } else {
    result = [];
  }
  return result;
};

export const checkIsModelFilled = values => {
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
