import FormError from "components/form/form-error/form-error";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _EmailConfirmFailure: React.FC<Props> = ({ errorMessage }) => {
  const [t] = useTranslation();
  return (
    <div>
      <Row>
        <Text muted>{t("auth:email-confirm.error-during-confirmation")}</Text>
      </Row>
      <Row>
        <FormError error={errorMessage} />
      </Row>
    </div>
  );
};

interface Props {
  errorMessage: string;
}

const EmailConfirmFailure = React.memo(_EmailConfirmFailure);
export default EmailConfirmFailure;
