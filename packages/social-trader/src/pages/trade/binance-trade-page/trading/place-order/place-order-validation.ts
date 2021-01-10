import { TFunction } from "i18next";
import { minMaxNumberShape } from "utils/validators/validators";

export const tradeNumberShape = ({
  t,
  min,
  max,
  divider
}: {
  t: TFunction;
  min: number;
  max: number;
  divider: number;
}) =>
  minMaxNumberShape({
    t,
    min,
    max
  }).test({
    message: `Must be multiply of ${divider}`,
    test: value => true //modulo(value, divider) === 0
  });
