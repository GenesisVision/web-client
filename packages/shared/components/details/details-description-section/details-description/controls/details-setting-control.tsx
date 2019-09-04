import "./details-description-control.scss";

import React from "react";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import Link from "shared/components/link/link";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsSettingControl: React.FC<Props> = ({ url, title, text }) => {
  return (
    <DetailsDescriptionControl
      tag={Link}
      to={url}
      className="details-description-control--button"
      text={text}
    >
      <SettingsIcon className="details-description-control__icon" />
    </DetailsDescriptionControl>
  );
};

export interface Props {
  url: string;
  title: string;
  text: string;
}

const DetailsSettingControl = React.memo(_DetailsSettingControl);
export default DetailsSettingControl;
