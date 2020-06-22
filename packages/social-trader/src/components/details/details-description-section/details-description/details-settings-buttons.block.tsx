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

const _DetailsSettingsButtons: React.FC<Props> = ({
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
        <Row>
          <DetailsFavorite
            asset={asset}
            id={id}
            isFavorite={personalDetails && personalDetails.isFavorite}
          />
        </Row>
      )}
      {personalDetails && notificationsUrl && (
        <Row>
          <DetailsNotification
            to={notificationsUrl}
            hasNotifications={
              personalDetails && personalDetails.hasNotifications
            }
          />
        </Row>
      )}
      {isOwnAsset && !!settingsUrl && (
        <Row>
          <DetailsSettingControl
            to={settingsUrl}
            text={t("asset-details:description.settings")}
          />
        </Row>
      )}
    </div>
  );
};

interface Props {
  isOwnAsset?: boolean;
  asset?: ASSET;
  personalDetails?: PersonalDetailsType;
  id: string;
  notificationsUrl?: ToType;
  settingsUrl?: ToType;
}

export const DetailsSettingsButtons = React.memo(_DetailsSettingsButtons);
