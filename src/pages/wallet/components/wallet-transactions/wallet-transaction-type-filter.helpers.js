export const composeDefaultTransactionTypeFilter = () => ({
  name: "txAction",
  composeRequestValue: value => value,
  defaultValue: undefined
});
