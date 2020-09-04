import { ToType } from "components/link/link";
import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { PersonalDetailsType } from "../../details.types";
import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";
import DetailsSettingControl from "./controls/details-setting-control";
import styles from "./details-description.module.scss";

interface Props {
  isOwnAsset?: boolean;
  asset?: ASSET;
  personalDetails?: PersonalDetailsType;
  id: string;
  systemUrl?: string;
  notificationsUrl?: ToType;
  settingsUrl?: ToType;
}

const _DetailsSettingsButtons: React.FC<Props> = ({
  systemUrl,
  isOwnAsset,
  asset,
  personalDetails,
  id,
  notificationsUrl,
  settingsUrl
}) => {
  const [t] = useTranslation();
  return (
    <div className={styles["asset-details-description__settings"]}>
      {personalDetails && (
        <Row className={styles["asset-details-description__settings-item"]}>
          <DetailsFavorite
            asset={asset}
            id={id}
            isFavorite={personalDetails && personalDetails.isFavorite}
          />
        </Row>
      )}
      {personalDetails && notificationsUrl && (
        <Row className={styles["asset-details-description__settings-item"]}>
          <DetailsNotification
            to={notificationsUrl}
            hasNotifications={
              personalDetails && personalDetails.hasNotifications
            }
          />
        </Row>
      )}
      {isOwnAsset && !!settingsUrl && (
        <Row className={styles["asset-details-description__settings-item"]}>
          <DetailsSettingControl
            to={settingsUrl}
            text={t("asset-details:description.settings")}
          />
        </Row>
      )}
      {systemUrl && (
        <Row>
          <DetailsSettingControl
            to={{ pathname: systemUrl }}
            text={"Admin panel"}
          />
        </Row>
      )}
    </div>
  );
};

export const DetailsSettingsButtons = React.memo(_DetailsSettingsButtons);
