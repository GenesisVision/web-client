import { AmountWithCurrency, ProfilePublicShort } from "gv-api-web";
import { getRandomInteger } from "utils/helpers";

export const mockDate = ("2019-09-05T09:50:23.1201470+00:00" as unknown) as Date;

export const managerLoaderData = {
  id: "",
  username: "Manager name",
  avatar: "",
  registrationDate: mockDate,
  url: "",
  socialLinks: []
};

export const ownerLoaderData: ProfilePublicShort = {
  id: "",
  username: "Manager name",
  url: ""
};

export const amountWithCurrencyLoaderData: AmountWithCurrency = {
  amount: getRandomInteger(0, 10000000),
  currency: "GVT"
};
