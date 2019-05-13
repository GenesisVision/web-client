import "./notify-button.scss";

import { subscribeAvailableToInvest } from "pages/programs/program-details/services/program-details.service";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import Tooltip from "shared/components/tooltip/tooltip";
import { CurrencyEnum } from "shared/utils/types";

class _NotifyButton extends React.PureComponent<Props, State> {
  state = {
    subscription: false,
    notificationId: this.props.notificationId
  };

  handleClick = () => {
    this.setState({ subscription: true });
    this.props
      .subscribeAvailableToInvest({
        assetId: this.props.assetId,
        currency: this.props.currency
      })
      .then(notificationId => {
        this.setState({
          notificationId,
          subscription: false
        });
      })
      .catch(() => {
        this.setState({
          subscription: false
        });
      });
  };

  render() {
    const { t } = this.props;
    return (
      <div className="notify-button">
        <GVButton
          className="program-details-description__invest-btn"
          onClick={this.handleClick}
          disabled={Boolean(
            this.state.notificationId ||
              this.state.subscription ||
              !this.props.canInvest
          )}
        >
          {t("buttons.notify")}
        </GVButton>
        <Tooltip
          render={() => t("program-details-page.description.notify-hint")}
        >
          <div className="notify-button__hint">?</div>
        </Tooltip>
      </div>
    );
  }
}

const NotifyButton = compose<React.FC<OwnProps>>(
  translate(),
  connect(
    undefined,
    {
      subscribeAvailableToInvest
    }
  )
)(_NotifyButton);

export default NotifyButton;

interface OwnProps {
  assetId: string;
  notificationId?: string;
  currency: CurrencyEnum;
  canInvest: boolean;
}

interface DispatchProps {
  subscribeAvailableToInvest: (
    props: {
      assetId: string;
      currency: string;
    }
  ) => Promise<string>;
}

interface Props extends OwnProps, InjectedTranslateProps, DispatchProps {}

interface State {
  notificationId?: string;
  subscription: boolean;
}
