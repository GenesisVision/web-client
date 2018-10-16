const dateFormat = date => {
  return new Date(+date).toDateString();
};

const getSign = num => (num < 0 ? "-" : "");

const getDecimal = num => {
  return num - Math.floor(num);
};

const getFmnp = x => {
  if (!x) return 0;
  let num = Number(x);
  let str = num.toString();
  const fmn = str[0];
  const index = x.indexOf(fmn);
  return index + 1;
};

const removeLastZeros = arr => {
  let result = [...arr];
  let initialLength = result.length;
  result.reverse();

  for (let i = 0; i <= initialLength; i++) {
    if (Number(result[0]) !== 0) break;

    result = result.slice(1);
  }
  result.reverse();
  return result;
};

const roundingAccuracy = [null, 8, 6, 4, 2];

const decreaseAccuracy = x => {
  let integer = Math.floor(x);
  integer = integer.toString();
  let charCount = integer.length;
  let accuracy = 0;
  if (charCount <= 4) {
    accuracy = roundingAccuracy[charCount];
  }

  return x.toFixed(accuracy);
};

const formatPositive = x => {
  const decimal = getDecimal(x)
    .toFixed(32)
    .split(".")[1];
  const fmnp = getFmnp(decimal);
  let result;

  if (Number(decimal) === 0 || Number(x) === 0) {
    result = x;
    return result;
  }

  if (x > 1) {
    result = Number(decreaseAccuracy(x));
  }

  if (x < 1 && fmnp > 8) {
    result = 1 + x;
    result = result.toFixed(fmnp);
    result = result.split("");
    result[0] = "0";
    result = result.join("");
  }

  if (x < 1 && fmnp <= 8) {
    result = 1 + x;
    result = result.toFixed(8);
    result = result.split("");
    result[0] = "0";
    result = removeLastZeros(result);
    result = result.join("");
  }
  return result;
};

const formatValue = x => {
  if (!x) return x;
  const abs = Math.abs(x);
  const sign = getSign(x);
  const result = sign + formatPositive(abs);

  return result;
};

export { dateFormat, formatValue };
