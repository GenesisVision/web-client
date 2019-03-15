export type TableItems<T> = {
  total: number;
  items: T[];
};

export type DefaultTableState = {
  total: number;
  [propertyName: string]: any;
};

export const mapToTableItems = <T>(propertyName: string) => (
  data: DefaultTableState
): TableItems<T> => ({
  total: data.total,
  items: data[propertyName] as T[]
});
