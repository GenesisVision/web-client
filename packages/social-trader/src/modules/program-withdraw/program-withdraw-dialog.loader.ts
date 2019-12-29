import faker from "faker";
import { ProgramWithdrawInfo } from "gv-api-web";
import { getRandomInteger } from "utils/helpers";

export const ProgramWithdrawInfoLoaderData: ProgramWithdrawInfo = {
  withheldInvestment: getRandomInteger(0, 100),
  isOwner: false,
  periodEnds: new Date(),
  title: faker.lorem.word(),
  availableToWithdraw: getRandomInteger(0, 100)
};
