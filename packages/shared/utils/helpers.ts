import { Nullable } from "./types";

const allowValuesNumberFormat = ({
  from,
  to
}: {
  from: number;
  to: number;
}) => (values: { floatValue: number; formattedValue: string }): boolean => {
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

const convertToArray = (value: any): any[] =>
  Array.isArray(value) ? value : [value];

export { allowValuesNumberFormat, getNumberWithoutSuffix, convertToArray };
