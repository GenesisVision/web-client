import { Button } from "components/button/button";
import { SettingsIcon } from "components/icon/settings-icon";
import { ToType } from "components/link/link";
import React from "react";

import { DescriptionControlIcon } from "./description-control-icon";
import DetailsDescriptionControl from "./details-description-control";

export interface Props {
  to: ToType;
  text: string;
}

const _DetailsSettingControl: React.FC<Props> = ({ to, text }) => {
  return (
    <Button color={"secondary"} noPadding variant={"text"}>
      <DetailsDescriptionControl to={to} text={text}>
        <DescriptionControlIcon>
          <SettingsIcon />
        </DescriptionControlIcon>
      </DetailsDescriptionControl>
    </Button>
  );
};

const DetailsSettingControl = React.memo(_DetailsSettingControl);
export default DetailsSettingControl;
