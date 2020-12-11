import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogInfo } from "components/dialog/dialog-info";
import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import { RecoveryCode } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  codes: RecoveryCode[];
}

const getCodesString = (codes: RecoveryCode[]): string =>
  codes.map(code => code.code).join("\n");

const CodeItem = styled.div`
  font-size: 1.1rem;
  box-sizing: border-box;
  flex: 1 0 50%;
  padding: 5px;
`;

const CodesList = styled(Row)`
  text-align: center;
`;

const CodeList: React.FC<{ codes: RecoveryCode[] }> = React.memo(
  ({ codes }) => (
    <CodesList wrap>
      {codes.map(({ code }) => (
        <CodeItem key={code}>{code}</CodeItem>
      ))}
    </CodesList>
  )
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const _GoogleAuthCodes: React.FC<Props> = ({ codes }) => {
  const [t] = useTranslation();
  return (
    <Container>
      <DialogTop title={t("profile-page:2fa-page.codes.title")} />
      <DialogBottom>
        <Row>{t("profile-page:2fa-page.codes.recovery_codes")}</Row>
        <Row>{t("profile-page:2fa-page.codes.successfully")}</Row>
        <CodeList codes={codes} />
        <DialogButtons>
          <CopyButton wide value={getCodesString(codes)} />
        </DialogButtons>
        <DialogInfo>{t("profile-page:2fa-page.codes.warning")}</DialogInfo>
      </DialogBottom>
    </Container>
  );
};

const GoogleAuthCodes = React.memo(_GoogleAuthCodes);
export default GoogleAuthCodes;
