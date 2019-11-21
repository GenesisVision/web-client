import * as faker from "faker";
import { getRandomInteger, tableLoaderCreator } from "utils/helpers";

const getTag = () => ({ label: faker.lorem.word() });

export const getActiveLoaderData = (active?: string) => ({
  name: active || faker.finance.currencyName(),
  rate: getRandomInteger(0, 10),
  about: faker.lorem.words(50),
  tags: tableLoaderCreator(getTag)
});

export const fetchActive = ({ active }: { active?: string }) =>
  Promise.resolve(getActiveLoaderData(active));
