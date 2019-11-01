import "./details-description.scss";

import {
  PersonalFundDetailsFullOld,
  PersonalProgramDetailsFullOld
} from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";
import DetailsSettingControl from "./controls/details-setting-control";

const _DetailsSettingsButtons: React.FC<{
  personalDetails: PersonalProgramDetailsFullOld | PersonalFundDetailsFullOld;
  id: string;
  title: string;
  notificationsUrl: string;
  settingsUrl: string;
}> = ({ personalDetails, id, title, notificationsUrl, settingsUrl }) => {
  const [t] = useTranslation();
  return (
    <div className="asset-details-description__settings">
      <DetailsFavorite
        id={id}
        isFavorite={personalDetails && personalDetails.isFavorite}
      />
      <DetailsNotification
        title={title}
        url={notificationsUrl}
        hasNotifications={personalDetails && personalDetails.hasNotifications}
      />
      {personalDetails &&
        personalDetails.isOwnProgram &&
        personalDetails.canCloseAsset && (
          <DetailsSettingControl
            title={title}
            url={settingsUrl}
            text={t("program-details-page.description.program-settings")}
          />
        )}
    </div>
  );
};

export const DetailsSettingsButtons = React.memo(_DetailsSettingsButtons);
