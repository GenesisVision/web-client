import "./details-description.scss";

import { ToType } from "components/link/link";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { PersonalDetailsType } from "../../details.types";
import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";
import DetailsSettingControl from "./controls/details-setting-control";

const _DetailsSettingsButtons: React.FC<{
  personalDetails: PersonalDetailsType;
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
        personalDetails.isOwnAsset &&
        personalDetails.ownerActions.canClose && (
          <DetailsSettingControl
            to={settingsUrl}
            text={t("program-details-page.description.program-settings")}
          />
        )}
    </div>
  );
};

export const DetailsSettingsButtons = React.memo(_DetailsSettingsButtons);
