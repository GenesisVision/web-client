export interface TableItems<T> {
  total: number;
  items: T[];
}

export interface DefaultTableState {
  total: number;
  [propertyName: string]: any;
}

export const mapToTableItems = <T>(propertyName: string) => (
  data: DefaultTableState
): TableItems<T> => ({
  total: data.total,
  items: data[propertyName] as T[]
});
