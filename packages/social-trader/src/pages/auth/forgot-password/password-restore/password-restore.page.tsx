import { Row } from "components/row/row";
import { Text } from "components/text/text";
import PasswordRestoreContainer from "pages/auth/forgot-password/password-restore/password-restore-container";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _PasswordRestorePage: React.FC<Props> = ({ code, userId }) => {
  const [t] = useTranslation();
  return (
    <div>
      <Row>
        <Text muted>{t("auth.password-restore.new-password.text")}</Text>
      </Row>
      <Row>
        <PasswordRestoreContainer code={code} userId={userId} />
      </Row>
    </div>
  );
};

interface Props {
  userId: string;
  code: string;
}

const PasswordRestorePage = React.memo(_PasswordRestorePage);
export default PasswordRestorePage;
