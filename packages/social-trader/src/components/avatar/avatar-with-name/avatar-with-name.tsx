import "./avatar-with-name.scss";

import * as React from "react";

const _AvatarWithName: React.FC<Props> = ({ avatar, name }) => {
  return (
    <div className="avatar-with-name">
      {avatar && <div className="avatar-with-name__avatar">{avatar}</div>}
      <div className="avatar-with-name__name">{name}</div>
    </div>
  );
};

interface Props {
  avatar?: React.ReactNode;
  name: string | JSX.Element;
}

export const AvatarWithName = React.memo(_AvatarWithName);
