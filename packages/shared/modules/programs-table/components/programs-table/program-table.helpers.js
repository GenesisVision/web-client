export const composeCurrencyFilter = currencies => [
  { value: undefined, label: "All" },
  ...(currencies || []).map(x => ({ value: x, label: x }))
];
