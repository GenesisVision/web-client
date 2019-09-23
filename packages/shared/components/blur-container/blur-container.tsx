import "./blur-container.scss";

import React from "react";

const _BlurContainer: React.FC<Props> = ({ children, blur, show }) => (
  <div
    className="blur-container"
    style={{
      position: show ? "relative" : "absolute",
      opacity: show ? 1 : 0,
      filter: `blur(${blur ? 5 : 0}px)`
    }}
  >
    {children}
  </div>
);

interface Props {
  blur: boolean;
  show: boolean;
  loader?: boolean;
}

const BlurContainer = React.memo(_BlurContainer);
export default BlurContainer;
