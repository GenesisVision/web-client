import { Privacy } from "components/profile/components/personal-details/privacy/privacy";
import { PRIVACY_FORM_VALUES } from "components/profile/components/personal-details/privacy/privacy.types";
import PublicSelect from "components/profile/components/personal-details/public-select/public-select";
import ProfileImageContainer from "components/profile/settings/profile-image/profile-image-container";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import { ProfileFullViewModel } from "gv-api-web";
import PublicInfo from "modules/public-info/public-info";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  betaTesterSelector,
  isSocialBetaTester
} from "reducers/header-reducer";

const _Profile: React.FC<IProfileOwnProps> = ({
  info,
  onUpdate,
  isPending
}) => {
  const [t] = useTranslation();
  const betaTester = useSelector(betaTesterSelector);
  const isBetaTester = isSocialBetaTester(betaTester);
  return (
    <>
      <SettingsBlock label={t("profile-page.public-info")}>
        <PublicInfo
          isPending={isPending}
          about={info.about}
          userName={info.userName}
          onUpdate={onUpdate}
        />
      </SettingsBlock>
      <SettingsBlock label={t("profile-page.settings.profile-image")}>
        <ProfileImageContainer />
      </SettingsBlock>
      {isBetaTester && (
        <>
          <SettingsBlock>
            <PublicSelect />
          </SettingsBlock>
          <Row large>
            <h3>{t("profile-page.privacy.title")}</h3>
          </Row>
          <Row large>
            <SettingsBlock>
              <Privacy
                data={{
                  [PRIVACY_FORM_VALUES.whoCanViewCommentsOnMyPosts]:
                    info.whoCanViewCommentsOnMyPosts,
                  [PRIVACY_FORM_VALUES.whoCanPostToMayWall]:
                    info.whoCanPostToMayWall
                }}
                onUpdate={onUpdate}
                isPending={isPending}
              />
            </SettingsBlock>
          </Row>
        </>
      )}
    </>
  );
};

export interface IProfileOwnProps {
  isPending: boolean;
  onUpdate: () => void;
  info: ProfileFullViewModel;
}

const Profile = withLoader(React.memo(_Profile));
export default Profile;
