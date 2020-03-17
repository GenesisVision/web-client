import React from "react";

const _PostInputButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div className="post-input__button" onClick={onClick}>
      {children}
    </div>
  );
};

interface Props {
  children?: string | JSX.Element;
  onClick?: VoidFunction;
}

export const PostInputButton = React.memo(_PostInputButton);
