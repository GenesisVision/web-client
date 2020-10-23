import { Button } from "components/button/button";
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
import styled from "styled-components";

export interface IProfileOwnProps {
  isPending: boolean;
  onUpdate: () => void;
  info: ProfileFullViewModel;
}

const TextContainer = styled(Row)`
  max-width: 500px;
`;

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
            <TextContainer>
              <Text muted>
                KYC is an authentication mechanism required in the financial
                industry to help ensure companies are compliant with anti money
                laundering regulations.
              </Text>
            </TextContainer>
            <Row>
              <Link to={linkCreator(KYC_ROUTE)}>
                <Button color="primary" variant="outlined">
                  {t("buttons.verify")}
                </Button>
              </Link>
            </Row>
          </div>
        )}
      </SettingsBlock>
    </>
  );
};

const PersonalDetails = withLoader(React.memo(_PersonalDetails));
export default PersonalDetails;
