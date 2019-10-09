import "shared/components/details/details.scss";
import "shared/modules/asset-settings/asset-settings.scss";

import "./profile.scss";

import copy from "copy-to-clipboard";
import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import ProfileImageContainer from "shared/components/profile/settings/profile-image/profile-image-container";
import SettingsBlock from "shared/components/settings-block/settings-block";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ROLE } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useRole from "shared/hooks/use-role.hook";
import PublicInfo from "shared/modules/public-info/public-info";

const _Profile: React.FC<Props> = ({ info, notifySuccess, onSuccessEdit }) => {
  const [t] = useTranslation();
  const role = useRole();
  const onCopy = () => {
    copy(info.id);
    notifySuccess(t("profile-page.success-copy"));
  };
  return (
    <div className="asset-settings profile__container--padding-top">
      {role === ROLE.MANAGER && (
        <>
          <SettingsBlock label={t("profile-page.public-info")}>
            <PublicInfo
              about={info.about}
              userName={info.userName}
              onSuccessEdit={onSuccessEdit}
            />
          </SettingsBlock>
          <SettingsBlock label={t("profile-page.id")}>
            <div className="profile__content">
              <div>{info.id}</div>
              <GVButton onClick={onCopy}>{t("buttons.copy")}</GVButton>
            </div>
            }
          </SettingsBlock>
        </>
      )}
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
    </div>
  );
};

interface Props extends IProfileOwnProps {}

export interface IProfileOwnProps {
  info: ProfileFullViewModel;
  notifySuccess: (val: string) => void;
  onSuccessEdit: () => void;
}

const Profile = compose<
  React.ComponentType<IProfileOwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_Profile);
export default Profile;
