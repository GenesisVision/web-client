export const getTokenName = () => {
  const platform: string = process.env.REACT_APP_PLATFORM || "";
  return `gv${platform.substr(0, 1).toUpperCase()}${platform.substr(1)}Token`;
};
