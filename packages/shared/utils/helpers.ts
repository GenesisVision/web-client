import { NumberFormatValues } from "react-number-format";

import { Nullable } from "./types";

const merge = function(): object {
  const args: object[] = [...arguments];

  let result = {};

  args.forEach((obj: object) => {
    result = { ...result, ...obj };
  });

  return result;
};

const allowValuesNumberFormat = (
  { from, to } = { from: Number.MIN_SAFE_INTEGER, to: Number.MAX_SAFE_INTEGER }
) => (values: NumberFormatValues): boolean => {
  const { formattedValue, floatValue } = values;
  return (
    formattedValue === "" ||
    formattedValue === "0." ||
    (floatValue >= from && floatValue <= to)
  );
};

const getNumberWithoutSuffix = (str: string): Nullable<number> => {
  let result = null;
  let coincidence = str.match(/^[^\d]*(\d+)/);

  if (coincidence) {
    result = Number(coincidence[0]);
  }

  return result;
};

const convertToArray = (value: any[] | any): any[] =>
  Array.isArray(value) ? value : [value];

export {
  merge,
  allowValuesNumberFormat,
  getNumberWithoutSuffix,
  convertToArray
};
