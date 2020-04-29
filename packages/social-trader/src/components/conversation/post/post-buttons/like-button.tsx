import "./post-buttons.scss";

import React from "react";

const _LikeButton: React.FC<Props> = ({}) => {
  return <div>Like</div>;
};

interface Props {}

export const LikeButton = React.memo(_LikeButton);
