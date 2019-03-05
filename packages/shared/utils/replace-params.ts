const replaceParams = (path: string, params: object): string => {
  const keys = Object.keys(params).join("|");
  const regex = new RegExp(keys, "g");
  return path.replace(regex, m => params[m]);
};

export default replaceParams;
