import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div className={"app"}>
      <div className={"app__header"}>Header</div>
      <div className="app__main">{children}</div>
    </div>
  );
};

export default AppLayout;
