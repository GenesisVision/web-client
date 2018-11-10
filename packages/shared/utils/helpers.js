const merge = function() {
  const args = [...arguments];

  let result = {};

  args.forEach(obj => {
    result = { ...result, ...obj };
  });

  return result;
};

const allowValuesNumberFormat = ({ from, to }) => values => {
  const { formattedValue, floatValue } = values;
  return (
    formattedValue === "" ||
    formattedValue === "0." ||
    (floatValue >= from && floatValue <= to)
  );
};

const getNumberWithoutSuffix = str => {
  let result = null;
  let coincidence = str.match(/^[^\d]*(\d+)/);

  if (coincidence) {
    result = Number(coincidence[0]);
  }

  return result;
};

export { merge, allowValuesNumberFormat, getNumberWithoutSuffix };
