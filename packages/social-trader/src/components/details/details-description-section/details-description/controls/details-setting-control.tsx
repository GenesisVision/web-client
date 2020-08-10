import { Button } from "components/button/button";
import { SettingsIcon } from "components/icon/settings-icon";
import { ToType } from "components/link/link";
import React from "react";

import DetailsDescriptionControl from "./details-description-control";
import styles from "./details-description-control.module.scss";

export interface Props {
  to: ToType;
  text: string;
}

const _DetailsSettingControl: React.FC<Props> = ({ to, text }) => {
  return (
    <Button color={"secondary"} noPadding variant={"text"}>
      <DetailsDescriptionControl to={to} text={text}>
        <SettingsIcon className={styles["details-description-control__icon"]} />
      </DetailsDescriptionControl>
    </Button>
  );
};

const DetailsSettingControl = React.memo(_DetailsSettingControl);
export default DetailsSettingControl;
