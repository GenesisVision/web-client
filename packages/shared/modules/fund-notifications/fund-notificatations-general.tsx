import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GeneralNotification from "shared/components/general-notification/general-notification";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import { IAddNotificationSettingProps } from "../notification-settings/actions/notification-settings.actions";
import {
  addFundNotification,
  removeFundNotification
} from "./services/fund-notifications.services";

class FundNotificationsGeneral extends React.PureComponent<Props> {
  success = (text: string) => this.props.service.success(text);

  handleAdd = (options: IAddNotificationSettingProps) => {
    const { service, t } = this.props;
    return service
      .addFundNotification(options)
      .then(() =>
        this.success(
          t(`notifications-page.fund.general.${options.type}.enabled-alert`)
        )
      );
  };

  handleRemove = (options: { id: string; assetId: string; type: string }) => {
    const { service, t } = this.props;
    return service
      .removeFundNotification(options)
      .then(() =>
        this.success(
          t(`notifications-page.fund.general.${options.type}.disabled-alert`)
        )
      );
  };
  render() {
    const { t, settings, assetId } = this.props;
    return (
      <div className="notification-settings">
        <h3 className="notification-settings__subtitle">
          {t("notifications-page.fund.general.title")}
        </h3>
        <GeneralNotification
          name="FundNewsAndUpdates"
          label={t("notifications-page.fund.general.news-updates")}
          assetId={assetId}
          setting={settings.FundNewsAndUpdates}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name="FundRebalancing"
          label={t("notifications-page.fund.general.fund-rebalancing")}
          assetId={assetId}
          setting={settings.FundRebalancing}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      success: alertMessageActions.success,
      addFundNotification: addFundNotification,
      removeFundNotification: removeFundNotification
    },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface OwnProps {
  settings: any;
  assetId: string;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  success: typeof alertMessageActions.success;
  addFundNotification: typeof addFundNotification;
  removeFundNotification: typeof removeFundNotification;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(FundNotificationsGeneral);
