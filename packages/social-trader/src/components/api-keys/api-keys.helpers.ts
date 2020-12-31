import { SortingColumn } from "components/table/components/filtering/filter.type";

export const API_KEYS_TABLE_COLUMNS: SortingColumn[] = [
  { name: "title" },
  { name: "key" },
  { name: "secret", tooltip: true },
  { name: "readonly" },
  { name: "ipRestricted" },
  { name: "actions" }
];
