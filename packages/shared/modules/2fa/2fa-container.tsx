import "./2fa.scss";

import classNames from "classnames";
import { TwoFactorStatus } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { fetchTwoFactorAction } from "shared/actions/2fa-actions";
import Dialog from "shared/components/dialog/dialog";
import GVTextField from "shared/components/gv-text-field";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import Select from "shared/components/select/select";
import { twoFactorSelector } from "shared/reducers/2fa-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import DisableAuthContainer from "./disable-auth/disable-auth-container";
import GenerateRecoveryCode from "./google-auth/generate-recovery-codes/generate-recovery-codes";
import GoogleAuthContainer from "./google-auth/google-auth-container";

class _TwoFactorAuthContainer extends React.PureComponent<Props, State> {
  state = {
    isPending: false,
    type: undefined
  };

  componentDidMount(): void {
    this.props.services.fetchTwoFactor();
  }

  handleChange = (event: React.ChangeEvent<any>) => {
    this.setState({ type: event.target.value });
  };

  handleClose = () => {
    this.setState({ type: undefined });
  };

  handleSubmit = () => {
    this.props.services.fetchTwoFactor();
  };

  render() {
    const { t, twoFactorAuth, isPending } = this.props;
    const { type } = this.state;

    if (!twoFactorAuth) return null;

    return (
      <div className="two-factor">
        <h3 className="two-factor__title">{t("2fa-page.title")}</h3>
        <GVTextField
          name="2fa"
          label={t("2fa-page.type")}
          value={
            twoFactorAuth.twoFactorEnabled ? TYPE_2FA.GOOGLE : TYPE_2FA.DISABLE
          }
          onChange={this.handleChange}
          InputComponent={Select}
          disabled={isPending}
        >
          <option value={TYPE_2FA.DISABLE}>{t("2fa-page.none")}</option>
          <option value={TYPE_2FA.GOOGLE}>{t("2fa-page.google")}</option>
        </GVTextField>
        <GenerateRecoveryCode disabled={twoFactorAuth.twoFactorEnabled} />
        <Dialog
          className={classNames({
            "dialog--width-auto": !twoFactorAuth.twoFactorEnabled
          })}
          open={Boolean(this.state.type)}
          onClose={this.handleClose}
        >
          {type && type === TYPE_2FA.GOOGLE ? (
            <GoogleAuthContainer onSubmit={this.handleSubmit} />
          ) : (
            <DisableAuthContainer onSubmit={this.handleSubmit} />
          )}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  twoFactorAuth: twoFactorSelector(state),
  isPending: state.accountSettings.twoFactorAuth.isPending
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  services: bindActionCreators(
    {
      fetchTwoFactor: fetchTwoFactorAction,
      fetchProfileHeaderInfo: fetchProfileHeaderInfoAction
    },
    dispatch
  )
});

interface Props
  extends StateProps,
    DispatchProps,
    OwnProps,
    InjectedTranslateProps {}

interface StateProps {
  isPending: boolean;
  twoFactorAuth?: TwoFactorStatus;
}

interface DispatchProps {
  services: {
    fetchTwoFactor: () => ActionType;
    fetchProfileHeaderInfo: () => ActionType;
  };
}

interface OwnProps {}

interface State {
  type?: TYPE_2FA;
  isPending?: boolean;
}

enum TYPE_2FA {
  GOOGLE = "google",
  DISABLE = "disable"
}

const TwoFactorAuthContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_TwoFactorAuthContainer);
export default TwoFactorAuthContainer;
