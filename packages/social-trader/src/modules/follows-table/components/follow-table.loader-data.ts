// import { ProgramDetailsOld, ProgramsListOld, ProgramTag } from "gv-api-web";
import {
  managerLoaderData,
  mockDate
} from "components/details/details.loader-data";
import {
  personalProgramDetailsLoaderData,
  statisticListLoaderData
} from "pages/invest/programs/program-details/program-details.loader-data";
import {
  getRandomColor,
  getRandomInteger,
  getRandomWord,
  tableLoaderCreator
} from "utils/helpers";

const tagLoaderDataCreator = () => ({
  name: getRandomWord(),
  color: getRandomColor()
});
const tagsLoaderDataCreator = () => tableLoaderCreator(tagLoaderDataCreator);

export const followDetailsLoaderDataCreator = () => ({
  currency: "GVT",
  level: getRandomInteger(0, 100),
  levelProgress: getRandomInteger(0, 100),
  periodDuration: getRandomInteger(0, 100),
  stopOutLevel: getRandomInteger(0, 100),
  periodStarts: new Date("2019-09-23T20:58:38.8147750+00:00"),
  periodEnds: new Date("2019-09-25T02:58:38.8147750+00:00"),
  availableInvestmentInCurrency: getRandomInteger(0, 100),
  availableInvestmentLimit: getRandomInteger(0, 100),
  dashboardAssetsDetails: {
    share: getRandomInteger(0, 100)
  },
  statistic: statisticListLoaderData,
  personalDetails: personalProgramDetailsLoaderData,
  tags: tagsLoaderDataCreator(),
  id: "",
  logo: "",
  url: "",
  color: "#858585",
  title: getRandomWord(),
  description: "",
  status: "None",
  creationDate: mockDate,
  manager: managerLoaderData,
  chart: []
});

export const followListLoaderData = tableLoaderCreator(
  followDetailsLoaderDataCreator
);
