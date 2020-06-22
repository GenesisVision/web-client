import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import SettingsBlock from "components/settings-block/settings-block";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _PersonalDetails: React.FC<IProfileOwnProps> = ({ info }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <>
      <SettingsBlock label={t("profile-page:contacts")} checked={true}>
        <StatisticItem label={t("profile-page:email")}>
          {info.email}
        </StatisticItem>
      </SettingsBlock>
      <SettingsBlock
        label={t("profile-page:personal-info")}
        verificationStatus={info.verificationStatus}
      >
        {info.verificationStatus === "NotVerified" && (
          <Link to={linkCreator(KYC_ROUTE)}>
            <GVButton color="primary" variant="outlined">
              {t("buttons.verify")}
            </GVButton>
          </Link>
        )}
      </SettingsBlock>
    </>
  );
};

export interface IProfileOwnProps {
  isPending: boolean;
  onUpdate: () => void;
  info: ProfileFullViewModel;
}

const PersonalDetails = withLoader(React.memo(_PersonalDetails));
export default PersonalDetails;
