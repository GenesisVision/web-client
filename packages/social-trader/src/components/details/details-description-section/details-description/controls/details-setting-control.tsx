import { SettingsIcon } from "components/icon/settings-icon";
import { ToType } from "components/link/link";
import React from "react";

import DetailsDescriptionControl from "./details-description-control";
import styles from "./details-description-control.module.scss";

const _DetailsSettingControl: React.FC<Props> = ({ to, text }) => {
  return (
    <DetailsDescriptionControl to={to} text={text}>
      <SettingsIcon className={styles["details-description-control__icon"]} />
    </DetailsDescriptionControl>
  );
};

export interface Props {
  to: ToType;
  text: string;
}

const DetailsSettingControl = React.memo(_DetailsSettingControl);
export default DetailsSettingControl;
