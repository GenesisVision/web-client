import randomString from "randomstring";
import { NumberFormatValues } from "react-number-format";

import { Nullable } from "./types";

const getType = (value: any): string =>
  Array.isArray(value) ? "array" : typeof value;

const getArrayType = (array: any[]): Nullable<string> => {
  const supposedType = getType(array[0]);
  const isUniform = array
    .map(getType)
    .map(item => Object.is(item, supposedType))
    .reduce((prev: boolean, cur: boolean) => cur && prev);
  return isUniform ? supposedType : null;
};

const merge = <T>(...args: any[][] | {}[]): any[] | object | T => {
  switch (getArrayType(args)) {
    case "object":
      return mergeObjects(args);
    case "array":
      return mergeArrays(args as any[][]);
    default:
      return args[0];
  }
};

const mergeObjects = (items: object[]): object => {
  let result: object = {};
  items.forEach((item: object) => {
    result = { ...result, ...item };
  });
  return result;
};

const mergeArrays = (items: any[][]): any[] => {
  let result: any[] = [];
  items.forEach((item: any[]) => {
    result = [...result, ...item];
  });
  return result;
};

const hasCorrectCountNulls = (value: string): boolean => {
  const [whole, fraction] = value.split(".");
  if (fraction === undefined) return true;
  return !(whole[0] === "0" && whole.length > 1);
};

const allowValuesNumberFormat = (
  {
    from,
    to
  }: {
    from: number;
    to: number;
  } = { from: Number.MIN_SAFE_INTEGER, to: Number.MAX_SAFE_INTEGER }
) => ({ formattedValue, floatValue }: NumberFormatValues): boolean =>
  formattedValue === "" ||
  formattedValue === "0." ||
  (floatValue >= from &&
    floatValue <= to &&
    hasCorrectCountNulls(formattedValue));

const getNumberWithoutSuffix = (str: string): Nullable<number> => {
  let result = null;
  let coincidence = str.match(/^[^\d]*(\d+)/);

  if (coincidence) {
    result = Number(coincidence[0]);
  }

  return result;
};

const convertToArray = (value: any): any[] =>
  Array.isArray(value) ? value : [value];

const getRandomInteger = (min: number, max: number): number =>
  Math.floor(min + Math.random() * (max + 1 - min));

const getRandomText = (params: Object) => randomString.generate(params);

export {
  getRandomText,
  getRandomInteger,
  getType,
  getArrayType,
  allowValuesNumberFormat,
  getNumberWithoutSuffix,
  convertToArray,
  merge,
  mergeObjects,
  mergeArrays
};
