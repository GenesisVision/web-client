import { IAttachAccountSettingsFormValues } from "../components/attach-account-settings/attach-account-settings";

export const attachAccount = ({
  values
}: {
  values: IAttachAccountSettingsFormValues;
}) => {
  return Promise.resolve();
};

export const fetchExchanges = () => {
  return Promise.resolve(["Binance"]);
};
