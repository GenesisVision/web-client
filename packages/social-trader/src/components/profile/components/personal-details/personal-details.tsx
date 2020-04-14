import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import PublicSelect from "components/profile/components/personal-details/public-select/public-select";
import { KYC_ROUTE } from "components/profile/profile.constants";
import SettingsBlock from "components/settings-block/settings-block";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  betaTesterSelector,
  isSocialBetaTester
} from "reducers/header-reducer";

const _PersonalDetails: React.FC<IProfileOwnProps> = ({ info }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const betaTester = useSelector(betaTesterSelector);
  const isBetaTester = isSocialBetaTester(betaTester);
  return (
    <>
      <SettingsBlock label={t("profile-page.contacts")} checked={true}>
        <StatisticItem label={t("profile-page.email")}>
          {info.email}
        </StatisticItem>
      </SettingsBlock>
      <SettingsBlock
        label={t("profile-page.personal-info")}
        verificationStatus={info.verificationStatus}
      >
        {info.verificationStatus === "NotVerified" && (
          <Link
            className="level-calculator-popup__btn-verify"
            to={linkCreator(KYC_ROUTE)}
          >
            <GVButton color="primary" variant="outlined">
              {t("buttons.verify")}
            </GVButton>
          </Link>
        )}
      </SettingsBlock>
      {isBetaTester && (
        <SettingsBlock>
          <PublicSelect />
        </SettingsBlock>
      )}
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
