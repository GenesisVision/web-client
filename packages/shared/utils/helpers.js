const merge = function() {
  const args = [...arguments];

  let result = {};

  args.forEach(obj => {
    result = { ...result, ...obj };
  });

  return result;
};

export { merge };
