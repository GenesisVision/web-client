import { useState } from "react";

type TValue = boolean;
export const nullValue: TValue = false;

const useIsOpen = (
  initValue: TValue = nullValue
): [TValue, () => void, () => void] => {
  const [open, setOpenInner] = useState<TValue>(initValue);
  const setOpen = () => setOpenInner(true);
  const setClose = () => setOpenInner(false);
  return [open, setOpen, setClose];
};

export default useIsOpen;
