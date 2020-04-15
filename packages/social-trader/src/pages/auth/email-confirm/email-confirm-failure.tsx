import FormError from "components/form/form-error/form-error";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _EmailConfirmFailure: React.FC<Props> = ({ errorMessage }) => {
  const [t] = useTranslation();
  return (
    <div>
      <Row>
        <MutedText noWrap={false}>
          {t("auth.email-confirm.error-during-confirmation")}
        </MutedText>
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
