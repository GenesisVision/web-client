import GVButton from "components/gv-button";
import { LabeledValue } from "components/labeled-value/labeled-value";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { Text } from "components/text/text";
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
        <LabeledValue label={t("profile-page:email")}>
          {info.email}
        </LabeledValue>
      </SettingsBlock>
      <SettingsBlock
        label={t("profile-page:personal-info")}
        verificationStatus={info.verificationStatus}
      >
        {info.verificationStatus === "NotVerified" && (
          <div>
            <Row>
              <div style={{ maxWidth: 500 }}>
                <Text muted>
                  KYC is an authentication mechanism required in the financial
                  industry to help ensure companies are compliant with anti
                  money laundering regulations.
                </Text>
              </div>
            </Row>
            <Row>
              <Link to={linkCreator(KYC_ROUTE)}>
                <GVButton color="primary" variant="outlined">
                  {t("buttons.verify")}
                </GVButton>
              </Link>
            </Row>
          </div>
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
