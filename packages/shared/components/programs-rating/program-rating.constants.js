import { PROGRAMS_COLUMNS } from "../../modules/programs-table/components/programs-table/programs.constants";

export const LEVELS = {
  "2": "2 > 3",
  "3": "3 > 4",
  "4": "4 > 5",
  "5": "5 > 6",
  "6": "6 > 7"
};

export const COLUMNS = [
  {
    name: "position"
  },
  ...PROGRAMS_COLUMNS
];

export const SELF_PROGRAMS = "selfPrograms";

export const PROGRAMS = "programs";
