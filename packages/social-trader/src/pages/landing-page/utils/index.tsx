import React from "react";

export const getElementHeight = (ref: React.RefObject<HTMLDivElement>) => {
  return ref.current ? ref.current.getBoundingClientRect().height : 0;
};
