import "./custom-notification.scss";

import { NotificationSettingViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import GVTextField from "shared/components/gv-text-field";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  TRemoveNotification,
  TToggleNotification
} from "./asset-notifications.types";

class CustomNotification extends React.PureComponent<Props, State> {
  state = {
    isPending: false
  };

  handleSwitch = () => {
    this.setState({ isPending: true });
    const { service, settings, t } = this.props;
    const status = !Boolean(settings.isEnabled);
    service
      .toggleNotifications({
        id: settings.id,
        assetId: settings.assetId,
        enabled: status
      })
      .then(() => {
        service.success(
          t(
            `notifications-page.custom.${status ? "enabled" : "disabled"}-alert`
          )
        );
        this.setState({ isPending: false });
      })
      .catch(() => this.setState({ isPending: false }));
  };

  handleDelete = () => {
    this.setState({ isPending: true });
    const { t, settings, service } = this.props;
    service
      .removeNotification(settings, t(`notifications-page.custom.delete-alert`))
      .then(() => this.setState({ isPending: false }))
      .catch(() => this.setState({ isPending: false }));
  };

  render() {
    const { t, settings } = this.props;
    return (
      <div className="custom-notification">
        <label className="notification-setting">
          <GVSwitch
            className="notification-setting__switch"
            name={settings.type}
            value={settings.isEnabled}
            disabled={this.state.isPending}
            color="primary"
            onChange={this.handleSwitch}
            touched={false}
          />
          <span className="notification-setting__label">
            {t(`notifications-page.create.${settings.conditionType}.title`)}
          </span>
        </label>
        <div className="custom-notification__offset">
          <GVTextField
            name="conditionAmount"
            value={settings.conditionAmount.toString()}
            disabled
            label={t(
              `notifications-page.create.${settings.conditionType}.label`
            )}
            adornment={settings.conditionType === "Profit" ? "%" : undefined}
            InputComponent={NumberFormat}
          />
          <GVButton
            variant="text"
            color="secondary"
            disabled={this.state.isPending}
            onClick={this.handleDelete}
          >
            {t("buttons.delete")}
          </GVButton>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { removeNotification, toggleNotifications }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      success: alertMessageActions.success,
      removeNotification,
      toggleNotifications
    },
    dispatch
  )
});

interface Props extends DispatchProps, OwnProps, WithTranslation {}

interface ServiceThunks extends ActionCreatorsMapObject {
  success: typeof alertMessageActions.success;
  removeNotification: TRemoveNotification;
  toggleNotifications: TToggleNotification;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  settings: NotificationSettingViewModel;
  removeNotification: TRemoveNotification;
  toggleNotifications: TToggleNotification;
}

interface State {
  isPending: boolean;
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(CustomNotification);
