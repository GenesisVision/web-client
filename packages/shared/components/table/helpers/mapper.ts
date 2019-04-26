export type SpecificTypePropsNames<TSource, TResult> = {
  [K in keyof TSource]: TSource[K] extends TResult ? K : never
}[keyof TSource];

type SpecificTypeProps<TSource, TResult> = Pick<
  TSource,
  SpecificTypePropsNames<TSource, TResult>
>;

export interface IDataModel<T> {
  total: number;
  items: T[];
}

export const mapToTableItems = <
  TSource extends SpecificTypeProps<TSource, TResult[]> & { total: number },
  TResult
>(
  propertyName: SpecificTypePropsNames<TSource, TResult[]>
) => {
  return (data: TSource): IDataModel<TResult> => ({
    total: data.total,
    items: data[propertyName] as any
  });
};
