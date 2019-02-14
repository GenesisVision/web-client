import React from "react";
import { translate } from "react-i18next";

const FollowTop = () => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>Title</h2>
      </div>
    </div>
  );
};

FollowTop.propTypes = {};

export default translate()(FollowTop);
