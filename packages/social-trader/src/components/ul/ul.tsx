import React from "react";

import style from "./ul.module.scss";

export const Ul: React.FC = ({ children }) => {
  return <ul className={style["ul"]}>{children}</ul>;
};
