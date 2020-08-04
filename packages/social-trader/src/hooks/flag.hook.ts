import { useState } from "react";

type TValue = boolean;
export const nullValue: TValue = false;

const useFlag = (
  initValue: TValue = nullValue
): [TValue, () => void, () => void, (value: TValue) => void] => {
  const [open, setOpenInner] = useState<TValue>(initValue);
  const setOpen = () => setOpenInner(true);
  const setClose = () => setOpenInner(false);
  const setValue = (value: TValue) => setOpenInner(value);
  return [open, setOpen, setClose, setValue];
};

export default useFlag;
