const getArrow = () => {
  return String.fromCharCode(8594);
};

export const setArrow = name => {
  const arrow = getArrow();
  return name.replace(/\s/gi, ` ${arrow} `);
};
