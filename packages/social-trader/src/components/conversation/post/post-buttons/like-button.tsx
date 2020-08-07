import React from "react";

const _LikeButton: React.FC = () => {
  return <div>Like</div>;
};

export const LikeButton = React.memo(_LikeButton);
