import { ProgramDetails, ProgramsList, ProgramTag } from "gv-api-web";
import {
  managerLoaderData,
  mockDate
} from "shared/components/details/details.loader-data";
import { getRandomInteger } from "shared/utils/helpers";
import {
  personalProgramDetailsLoaderData,
  statisticLoaderData
} from "shared/components/programs/program-details/program-details.loader-data";
import faker from "faker";

const tagLoaderDataCreator = (): ProgramTag => ({
  name: faker.lorem.word(),
  color: faker.internet.color()
});
const tagsLoaderDataCreator = (): ProgramTag[] =>
  new Array(getRandomInteger(1, 5)).fill("").map(() => tagLoaderDataCreator());

export const programDetailsLoaderDataCreator = (): ProgramDetails => ({
  currency: "GVT",
  level: getRandomInteger(0, 100),
  levelProgress: getRandomInteger(0, 100),
  periodDuration: getRandomInteger(0, 100),
  stopOutLevel: getRandomInteger(0, 100),
  periodStarts: new Date("2019-09-23T20:58:38.8147750+00:00"),
  periodEnds: new Date("2019-09-25T02:58:38.8147750+00:00"),
  availableInvestment: getRandomInteger(0, 100),
  availableInvestmentBase: getRandomInteger(0, 100),
  availableInvestmentLimit: getRandomInteger(0, 100),
  dashboardAssetsDetails: {
    share: getRandomInteger(0, 100)
  },
  statistic: statisticLoaderData,
  rating: {
    rating: getRandomInteger(0, 100),
    profit: getRandomInteger(0, 100),
    canLevelUp: false,
    topPercent: getRandomInteger(0, 100)
  },
  personalDetails: personalProgramDetailsLoaderData,
  tags: tagsLoaderDataCreator(),
  id: "",
  logo: "",
  url: "",
  color: "#858585",
  title: faker.lorem.word(),
  description: "",
  status: "None",
  creationDate: mockDate,
  manager: managerLoaderData,
  chart: []
});

export const programListLoaderData: ProgramDetails[] = new Array(10)
  .fill("")
  .map(() => programDetailsLoaderDataCreator());

export const programTableLoaderData: ProgramsList = {
  programs: programListLoaderData,
  total: programListLoaderData.length
};
