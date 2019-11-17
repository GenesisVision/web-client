import faker from "faker";
import { ProgramWithdrawInfo } from "gv-api-web";
import { getRandomInteger } from "shared/utils/helpers";

export const ProgramWithdrawInfoLoaderData: ProgramWithdrawInfo = {
  periodEnds: new Date(),
  title: faker.lorem.word(),
  availableToWithdraw: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
};
