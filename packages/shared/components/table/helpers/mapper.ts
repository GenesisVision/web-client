export type TableItems<T> = {
  total: number;
  items: T[];
};

export const mapToTableItems = <T>(propertyName: string) => (
  data: any
): TableItems<T> => ({
  total: data.total,
  items: data[propertyName]
});
