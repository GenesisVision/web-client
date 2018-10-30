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

const formatValue = (value, decimalScale) => {
  value = typeof value !== "number" ? +value : value;
  if (value === undefined || isNaN(value)) return null;
  if (value === 0 || value.toFixed(0) == value) return value;
  return [...[value.toFixed(decimalScale || 9).split(".")]]
    .map(item => {
      if (item[0] < 10) return [item[0], item[1].slice(0, 8)];
      if (item[0] < 100) return [item[0], item[1].slice(0, 6)];
      if (item[0] < 1000) return [item[0], item[1].slice(0, 4)];
      if (item[0] >= 1000) return [item[0], item[1].slice(0, 2)];
    })
    .map(item => {
      if (+item[1] === 0) item[1] = item[1].slice(0, -1) + "1";
      return item;
    })
    .map(item => {
      return [
        item[0],
        String(
          +item[1]
            .split("")
            .reverse()
            .join("")
        )
          .split("")
          .reverse()
          .join("")
      ];
    })
    .map(item => item.join("."))
    .join();
};

export { dateFormat, formatValue, roundTypeEnum };
