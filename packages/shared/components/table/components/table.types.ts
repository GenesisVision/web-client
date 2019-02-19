export type Column = {
  name: string;
};

export interface IUpdateFilterFunc {
  (filer: any): void;
}
