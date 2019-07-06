import { useState } from "react";

type TOpen = boolean;

const useIsOpen = (
  initValue: TOpen = false
): [TOpen, () => void, () => void] => {
  const [open, setOpenInner] = useState<TOpen>(initValue);
  const setOpen = () => setOpenInner(true);
  const setClose = () => setOpenInner(false);
  return [open, setOpen, setClose];
};

export default useIsOpen;
