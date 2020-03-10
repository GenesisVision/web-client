import "./post-buttons.scss";

import React from "react";

const _ShareButton: React.FC<Props> = ({}) => {
  return <div>Share</div>;
};

interface Props {}

export const ShareButton = React.memo(_ShareButton);
