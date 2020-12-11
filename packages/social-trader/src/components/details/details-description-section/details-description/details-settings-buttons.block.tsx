import { DescriptionControlIcon } from "components/details/details-description-section/details-description/controls/description-control-icon";
import { DetailsDescriptionControlButton } from "components/details/details-description-section/details-description/controls/details-description-control";
import { SettingsIcon } from "components/icon/settings-icon";
import { ToType } from "components/link/link";
import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { mediaBreakpointTablet } from "utils/style/media";
import { $paddingXsmall, $paddingXsmallMobile } from "utils/style/sizes";

import { PersonalDetailsType } from "../../details.types";
import DetailsFavorite from "./controls/details-favorite";
import DetailsNotification from "./controls/details-notification";
import DetailsSettingControl from "./controls/details-setting-control";

interface Props {
  isOwnAsset?: boolean;
  asset?: ASSET;
  personalDetails?: PersonalDetailsType;
  id: string;
  systemUrl?: string;
  notificationsUrl?: ToType;
  settingsUrl?: ToType;
}

const SettingsContainer = styled.div`
  padding: ${$paddingXsmallMobile}px 0 ${$paddingXsmall}px;
  ${mediaBreakpointTablet(`
    margin-left: auto;
    padding: 0;
  `)}
`;

const SettingsItem = styled(Row)`
  justify-content: flex-end;
`;

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
    <SettingsContainer>
      {personalDetails && (
        <SettingsItem>
          <DetailsFavorite
            asset={asset}
            id={id}
            isFavorite={personalDetails && personalDetails.isFavorite}
          />
        </SettingsItem>
      )}
      {personalDetails && notificationsUrl && (
        <SettingsItem>
          <DetailsNotification
            to={notificationsUrl}
            hasNotifications={
              personalDetails && personalDetails.hasNotifications
            }
          />
        </SettingsItem>
      )}
      {isOwnAsset && !!settingsUrl && (
        <SettingsItem>
          <DetailsSettingControl
            to={settingsUrl}
            text={t("asset-details:description.settings")}
          />
        </SettingsItem>
      )}
      {systemUrl && (
        <SettingsItem>
          <a href={systemUrl}>
            <DetailsDescriptionControlButton text={"Admin panel"}>
              <DescriptionControlIcon>
                <SettingsIcon />
              </DescriptionControlIcon>
            </DetailsDescriptionControlButton>
          </a>
        </SettingsItem>
      )}
    </SettingsContainer>
  );
};

export const DetailsSettingsButtons = React.memo(_DetailsSettingsButtons);
