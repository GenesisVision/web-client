import faker from "faker";
import { ManagerProgramWithdrawInfoOld } from "gv-api-web";
import { getRandomInteger } from "shared/utils/helpers";

//@ts-ignore
export const ProgramWithdrawInfoLoaderData: ManagerProgramWithdrawInfoOld = {
  periodEnds: new Date(),
  title: faker.lorem.word(),
  availableToWithdraw: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
};
