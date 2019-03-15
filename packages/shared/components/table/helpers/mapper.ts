export type TableItems<T> = {
  total: number;
  items: T[];
};

export const mapToTableItems = <T>(propertyName: string) => (data: {
  total: number;
  [propertyName: string]: any;
}): TableItems<T> => ({
  total: data.total,
  items: data[propertyName] as T[]
});
