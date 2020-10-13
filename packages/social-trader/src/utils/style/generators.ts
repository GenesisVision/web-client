export interface IStyleValue<T = any> {
  value: T;
  unit?: string;
}

export type IStyleTable = {
  [keys: string]: IStyleValue | string;
};

export const getHEXA = (color: string, alpha: number): string => {
  const alphaInHEX = (Math.round(alpha * 255) + 0x10000)
    .toString(16)
    .substr(-2);
  return color + alphaInHEX;
};

export const parseStyles = ({
  styleTable
}: {
  styleTable: IStyleTable;
}): string => {
  return (
    Object.entries(styleTable)
      .map(([name, value]) => {
        const normalValue = (typeof value === "string"
          ? { value }
          : value) as IStyleValue;
        return [name, normalValue];
      })
      // @ts-ignore
      .map(([name, { value, unit = "" }]) => {
        return `${name}: ${value}${unit}; 
      `;
      })
      .join("")
  );
};
