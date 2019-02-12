import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const TagFilterButton = ({ t, isActive }) => {
  return (
    <GVButton
      variant="text"
      color="secondary"
      className={classnames("tag-filter__button tag-button", {
        "tag-filter__button--active": isActive
      })}
    >
      <span className="tag-filter__button-plus">+</span>Add tag
    </GVButton>
  );
};

export default translate()(TagFilterButton);
