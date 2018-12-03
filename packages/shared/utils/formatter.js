const reverseString = value =>
  String(value)
    .split("")
    .reverse()
    .join("");

const addOne = item =>
  item[1]
    ? [item[0], +item[1] === 0 ? item[1].slice(0, -1) + "1" : item[1]]
    : item;

const cleanNulls = item =>
  item[1] ? [item[0], reverseString(+reverseString(item[1]))] : item;
const formatValue = (value, decimalScale, abs) => {
  value = typeof value !== "number" ? +value : value;
  value = abs ? Math.abs(value) : value;
  if (value === undefined || isNaN(value) || value.toFixed(0) == value)
    return value;

  return [...[value.toFixed(10).split(".")]]
    .map(item => {
      if (decimalScale === 0) return [item[0]];
      if (decimalScale > 0) return [item[0], item[1].slice(0, decimalScale)];
      if (item[0] < 10) return [item[0], item[1].slice(0, 8)];
      if (item[0] < 100) return [item[0], item[1].slice(0, 6)];
      if (item[0] < 1000) return [item[0], item[1].slice(0, 4)];
      if (item[0] >= 1000) return [item[0], item[1].slice(0, 2)];
      return item;
    })
    .map(addOne)
    .map(cleanNulls)
    .map(item => (item[1] ? item.join(".") : item[0]))
    .join();
};

const formatPercent = value => {
  if (value < 0.1 && value > -0.1) return 0;
  return formatValue(value, value > 1 || value < -1 ? 0 : 1);
};

export { formatValue, formatPercent };
