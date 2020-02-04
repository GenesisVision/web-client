import "./details-block-title-box.scss";

import React from "react";

const DetailsBlockTitleBox: React.FC<Props> = ({ children }) => {
  return <div className="details-block-title-box">{children}</div>;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default DetailsBlockTitleBox;
