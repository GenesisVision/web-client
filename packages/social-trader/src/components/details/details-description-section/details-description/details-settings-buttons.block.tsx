import "./details-description.scss";

import { ToType } from "components/link/link";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { PersonalDetailsType } from "../../details.types";
import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";
import DetailsSettingControl from "./controls/details-setting-control";

const _DetailsSettingsButtons: React.FC<Props> = ({
  showSettings,
  personalDetails,
  id,
  notificationsUrl,
  settingsUrl
}) => {
  const [t] = useTranslation();
  return (
    <div className="asset-details-description__settings">
      {personalDetails && (
        <DetailsFavorite
          id={id}
          isFavorite={personalDetails && personalDetails.isFavorite}
        />
      )}
      {personalDetails && notificationsUrl && (
        <DetailsNotification
          to={notificationsUrl}
          hasNotifications={personalDetails && personalDetails.hasNotifications}
        />
      )}
      {((personalDetails && personalDetails.isOwnAsset) || showSettings) && (
        <DetailsSettingControl
          to={settingsUrl}
          text={t("program-details-page.description.settings")}
        />
      )}
    </div>
  );
};

interface Props {
  showSettings?: boolean;
  personalDetails?: PersonalDetailsType;
  id: string;
  notificationsUrl?: ToType;
  settingsUrl: ToType;
}

export const DetailsSettingsButtons = React.memo(_DetailsSettingsButtons);
