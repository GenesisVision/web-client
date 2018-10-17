const dateFormat = date => {
  return new Date(+date).toDateString();
};

const getDecimal = num => {
  return num - Math.floor(num);
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
    if (Number(result[0]) !== 0) break;

    result = result.slice(1);
  }
  result.reverse();
  return result.join("");
};

const roundingAccuracy = [null, 8, 6, 4, 2];

const roundTypeEnum = {
  ROUND: "round",
  FLOOR: "floor",
  CEIL: "ceil"
};

const roundLongNumber = (x, accuracy, roundType) => {
  let result;
  switch (roundType) {
    case "round":
    case "ceil":
      result = x.toFixed(accuracy);
      break;
    case "floor":
      result = x.toFixed(32).slice(0, accuracy - 32);
      break;
    default:
      result = x.toFixed(accuracy);
  }

  return result;
};

const roundTypeHandler = (x, accuracy, roundType) => {
  if (accuracy > 27) return roundLongNumber(x, accuracy, roundType);
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

const removeSign = x => {
  if (x < 0)
    return x
      .split("")
      .slice(1)
      .join("");

  return x;
};

const formatValue = (x, roundType = roundTypeEnum.FLOOR, isShowSign = true) => {
  if (!x) return x;

  const decimal = getDecimal(x)
    .toFixed(32)
    .split(".")[1];
  const fmnp = getFmnp(decimal);
  let result;

  if (Number(decimal) === 0 || Number(x) === 0) {
    result = x;
    return result;
  }

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

export { dateFormat, formatValue, roundTypeEnum };
