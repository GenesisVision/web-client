import copy from "copy-to-clipboard";
import { RecoveryCode } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogTop } from "shared/components/dialog/dialog-top";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

const CodeItem: React.FC<{ code: string }> = React.memo(({ code }) => (
  <div className="codes__item" key={code}>
    {code}
  </div>
));

const CodeList: React.FC<{ codes: RecoveryCode[] }> = React.memo(
  ({ codes }) => (
    <div className="codes__list">
      {codes.map(code => (
        <CodeItem code={code.code} />
      ))}
    </div>
  )
);

const getCodesString = (codes: RecoveryCode[]): string =>
  codes.map(code => code.code).join("\n");

const GoogleAuth: React.FC<Props> = ({
  t,
  codes,
  notifySuccess,
  notifyError
}) => {
  const onCopy = () => {
    try {
      copy(getCodesString(codes));
      notifySuccess(t("2fa-page.codes.copy-success"));
    } catch (error) {
      notifyError(t("2fa-page.codes.copy-error"));
    }
  };
  return (
    <>
      <DialogTop title={t("2fa-page.codes.title")} />
      <DialogBottom>
        <div className="dialog__text">
          <p>{t("2fa-page.codes.successfully")}</p>
          <p>{t("2fa-page.codes.recovery_codes")}</p>
        </div>
        <CodeList codes={codes} />
        <DialogButtons>
          <GVButton color="secondary" onClick={onCopy}>
            <>
              <CopyIcon />
              &nbsp;
              {t("buttons.copy")}
            </>
          </GVButton>
        </DialogButtons>
        <div className="dialog__info">{t("2fa-page.codes.warning")}</div>
      </DialogBottom>
    </>
  );
};

const GoogleAuthCodes = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    undefined,
    (dispatch: Dispatch): DispatchProps => ({
      notifySuccess: (text: string) =>
        dispatch(alertMessageActions.success(text)),
      notifyError: (text: string) => dispatch(alertMessageActions.error(text))
    })
  )
)(GoogleAuth);

interface Props extends WithTranslation, DispatchProps, OwnProps {}
interface OwnProps {
  codes: RecoveryCode[];
}
interface DispatchProps {
  notifySuccess: (text: string) => void;
  notifyError: (text: string) => void;
}
export default GoogleAuthCodes;
