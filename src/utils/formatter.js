const dateFormat = date => {
  return new Date(+date).toDateString();
};

const getFmnp = x => {
  let num = Number(x);
  let str = num.toString();
  const fmn = str[0];
  const index = x.indexOf(fmn);
  return index + 1;
};

const removeLastZeros = str => {
  let result = str.split("");
  let initialLength = result.length;
  result.reverse();
  for (let i = 0; i <= initialLength; i++) {
    if (Number(result[0]) === 0) {
      result = result.slice(1);
    } else if (result[0] === ".") {
      result = result.slice(1);
      break;
    } else {
      break;
    }
  }
  result.reverse();
  result = result.join("");
  return result;
};

const roundingAccuracy = [null, 8, 6, 4, 2];

const roundTypeEnum = {
  ROUND: "round",
  FLOOR: "floor",
  CEIL: "ceil"
};

const roundTypeHandler = (x, accuracy, roundType) => {
  let num = x * Math.pow(10, accuracy);
  let result = Math[roundType](num) / Math.pow(10, accuracy);
  result = result.toFixed(accuracy);
  result = removeLastZeros(result);
  return result;
};

const decreaseAccuracy = (x, roundType) => {
  let integer = Math.floor(x);
  integer = integer.toString();
  let charCount = integer.length;
  let accuracy = 0;
  if (charCount <= 4) {
    accuracy = roundingAccuracy[charCount];
  }

  let result = roundTypeHandler(x, accuracy, roundType);
  return result;
};

const getDecimalSeparated = x => x.split(".")[1];

const filterNum = x =>
  removeLastZeros(
    parseFloat(x)
      .toFixed(11)
      .slice(0, -1)
  );

const removeSign = x => {
  if (x < 0)
    return x
      .split("")
      .slice(1)
      .join("");

  return x;
};

const formatValueOld = (
  x,
  roundType = roundTypeEnum.FLOOR,
  isShowSign = true
) => {
  x = typeof x !== "number" ? +x : x;
  if (!x) return x;
  x = filterNum(x);
  const decimalSplited = getDecimalSeparated(x);

  if (!Number(decimalSplited) || Number(x) === 0) {
    return x;
  }

  const fmnp = getFmnp(decimalSplited);

  let result;

  if (x > 1 || x < -1) {
    result = Number(decreaseAccuracy(x, roundType));
  }

  if (x < 1 && x > -1 && fmnp > 8) {
    result = roundTypeHandler(x, fmnp, roundType);
  }

  if (x < 1 && x > -1 && fmnp <= 8) {
    result = roundTypeHandler(x, 8, roundType);
  }

  if (!isShowSign) return removeSign(result);

  return result;
};

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

export { dateFormat, formatValue, roundTypeEnum, formatPercent };
