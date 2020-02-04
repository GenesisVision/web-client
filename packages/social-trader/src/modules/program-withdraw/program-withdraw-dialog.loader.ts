import { ProgramWithdrawInfo } from "gv-api-web";
import { getRandomInteger, getRandomWord } from "utils/helpers";

export const ProgramWithdrawInfoLoaderData: ProgramWithdrawInfo = {
  withheldInvestment: getRandomInteger(0, 100),
  isOwner: false,
  periodEnds: new Date(),
  title: getRandomWord(),
  availableToWithdraw: getRandomInteger(0, 100)
};
