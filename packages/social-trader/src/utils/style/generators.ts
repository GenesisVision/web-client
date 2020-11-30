export const getHEXA = (color: string, alpha: number): string => {
  const alphaInHEX = (Math.round(alpha * 255) + 0x10000)
    .toString(16)
    .substr(-2);
  return color + alphaInHEX;
};
