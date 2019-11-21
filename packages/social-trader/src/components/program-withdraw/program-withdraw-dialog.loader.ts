import faker from "faker";
import { ProgramWithdrawInfo } from "gv-api-web";
import { getRandomInteger } from "utils/helpers";

export const ProgramWithdrawInfoLoaderData: ProgramWithdrawInfo = {
  isOwner: false,
  withheldInvestment: getRandomInteger(0, 100),
  periodEnds: new Date(),
  title: faker.lorem.word(),
  availableToWithdraw: getRandomInteger(0, 100)
};
