import "./details-description.scss";

import {
  PersonalFundDetailsFull,
  PersonalProgramDetailsFullOld
} from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";
import DetailsSettingControl from "./controls/details-setting-control";
import { ToType } from "shared/components/link/link";

const _DetailsSettingsButtons: React.FC<{
  personalDetails: PersonalProgramDetailsFullOld | PersonalFundDetailsFull;
  id: string;
  title: string;
  notificationsUrl: ToType;
  settingsUrl: ToType;
}> = ({ personalDetails, id, title, notificationsUrl, settingsUrl }) => {
  const [t] = useTranslation();
  return (
    <div className="asset-details-description__settings">
      <DetailsFavorite
        id={id}
        isFavorite={personalDetails && personalDetails.isFavorite}
      />
      <DetailsNotification
        to={notificationsUrl}
        hasNotifications={personalDetails && personalDetails.hasNotifications}
      />
      {personalDetails &&
        personalDetails.isOwnProgram &&
        personalDetails.canCloseAsset && (
          <DetailsSettingControl
            to={settingsUrl}
            text={t("program-details-page.description.program-settings")}
          />
        )}
    </div>
  );
};

export const DetailsSettingsButtons = React.memo(_DetailsSettingsButtons);
