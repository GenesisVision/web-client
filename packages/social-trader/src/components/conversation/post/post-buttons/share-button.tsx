import React from "react";

interface Props {}

const _ShareButton: React.FC<Props> = ({}) => {
  return <div>Share</div>;
};

export const ShareButton = React.memo(_ShareButton);
