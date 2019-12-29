import "./tooltip.scss";

import React from "react";

const _TooltipContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return <div className="tooltip__content">{children}</div>;
};

export const TooltipContent = React.memo(_TooltipContent);
