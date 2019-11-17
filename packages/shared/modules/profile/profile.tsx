import "shared/components/details/details.scss";
import "shared/modules/asset-settings/asset-settings.scss";
import "./profile.scss";

import copy from "copy-to-clipboard";
import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import GVButton from "shared/components/gv-button";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import SettingsBlock from "shared/components/settings-block/settings-block";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader from "shared/decorators/with-loader";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import PublicInfo from "shared/modules/public-info/public-info";

const _Profile: React.FC<IProfileOwnProps> = ({ info }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const onCopy = useCallback(() => {
    copy(info.id);
    dispatch(alertMessageActions.success("profile-page.success-copy"));
  }, [info.id]);
  return (
    <>
      <SettingsBlock label={t("profile-page.public-info")}>
        <PublicInfo about={info.about} userName={info.userName} />
      </SettingsBlock>
      <SettingsBlock label={t("profile-page.id")}>
        <div className="profile__content">
          <div>{info.id}</div>
          <GVButton onClick={onCopy}>{t("buttons.copy")}</GVButton>
        </div>
      </SettingsBlock>
      <SettingsBlock label={t("profile-page.settings.profile-image")}>
        <ProfileImageContainer />
      </SettingsBlock>
      <SettingsBlock label={t("profile-page.contacts")} checked={true}>
        <StatisticItem label={t("profile-page.email")}>
          {info.email}
        </StatisticItem>
      </SettingsBlock>
      <SettingsBlock
        label={t("profile-page.personal-info")}
        verificationStatus={info.verificationStatus}
      />
    </>
  );
};

export interface IProfileOwnProps {
  info: ProfileFullViewModel;
}

const Profile = withLoader(React.memo(_Profile));
export default Profile;
