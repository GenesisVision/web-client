import { ICreateAccountSettingsFormValues } from "../components/create-account-settings/create-account-settings";

export const createAccount = ({
  values
}: {
  values: ICreateAccountSettingsFormValues;
}) => {
  return Promise.resolve();
};

export const fetchExchanges = () => {
  return Promise.resolve(["Binance"]);
};
