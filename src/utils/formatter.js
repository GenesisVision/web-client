const dateFormat = (date) => {
  return (new Date(+date)).toDateString();
};

export { dateFormat };