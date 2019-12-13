import * as React from "react";
import { useState } from "react";

type TNullValue = undefined;
export type TAnchor = EventTarget | TNullValue;
export type TEvent = React.MouseEvent<Element, Event>;
export const anchorNullValue: TNullValue = undefined;

const useAnchor = (): {
  anchor: TAnchor;
  setAnchor: (event: TEvent) => void;
  clearAnchor: VoidFunction;
} => {
  const [anchor, setAnchorInner] = useState<TAnchor>(anchorNullValue);
  const clearAnchor = () => setAnchorInner(anchorNullValue);
  const setAnchor = (event: TEvent) =>
    setAnchorInner(event ? event.currentTarget : undefined);
  return { anchor, setAnchor, clearAnchor };
};

export default useAnchor;
