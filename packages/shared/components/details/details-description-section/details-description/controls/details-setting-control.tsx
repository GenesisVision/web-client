import "./details-description-control.scss";

import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import Link from "shared/components/link/link";

import DetailsDescriptionControl from "./details-description-control";

export interface Props {
  url: string;
  title: string;
}

const _DetailsSettingControl: React.FC<WithTranslation & Props> = ({
  t,
  url,
  title
}) => {
  return (
    <DetailsDescriptionControl
      tag={Link}
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
      className="details-description-control--button"
      text={t("program-details-page.description.program-settings")}
    >
      <SettingsIcon className="details-description-control__icon" />
    </DetailsDescriptionControl>
  );
};

const DetailsSettingControl = translate()(React.memo(_DetailsSettingControl));

export default DetailsSettingControl;
