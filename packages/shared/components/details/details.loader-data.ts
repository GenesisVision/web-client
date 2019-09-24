import faker from "faker";
import { getRandomInteger } from "shared/utils/helpers";
import { AmountWithCurrency } from "gv-api-web";

export const mockDate = ("2019-09-05T09:50:23.1201470+00:00" as unknown) as Date;

export const managerLoaderData = {
  id: "",
  username: faker.name.firstName(),
  avatar: "",
  registrationDate: mockDate,
  url: "",
  socialLinks: []
};

export const amountWithCurrencyLoaderData: AmountWithCurrency = {
  amount: getRandomInteger(0, 10000000),
  currency: "GVT"
};
