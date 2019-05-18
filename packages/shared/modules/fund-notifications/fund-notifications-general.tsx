import {
  NotificationSettingViewModel,
  NotificationSettingViewModelTypeEnum
} from "gv-api-web";
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

import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps
} from "../notification-settings/actions/notification-settings.actions";
import {
  addFundNotification,
  removeFundNotification
} from "./services/fund-notifications.services";

class _FundNotificationsGeneral extends React.PureComponent<Props> {
  getNotification = (
    type: NotificationSettingViewModelTypeEnum
  ): NotificationSettingViewModel =>
    this.props.settings.find(setting => setting.type === type)!;

  handleAdd = (options: IAddNotificationSettingProps) => {
    const { service, t } = this.props;
    return service
      .addFundNotification(options)
      .then(() =>
        service.success(
          t(`notifications-page.fund.general.${options.type}.enabled-alert`)
        )
      );
  };

  handleRemove = (options: IRemoveNotificationSettingProps) => {
    const { service, t } = this.props;
    return service
      .removeFundNotification(options)
      .then(() =>
        service.success(
          t(`notifications-page.fund.general.${options.type}.disabled-alert`)
        )
      );
  };
  render() {
    const { t, assetId } = this.props;
    return (
      <div className="notification-settings">
        <h3 className="notification-settings__subtitle">
          {t("notifications-page.fund.general.title")}
        </h3>
        <GeneralNotification
          name={NOTIFICATIONS.FundNewsAndUpdates}
          label={t("notifications-page.fund.general.news-updates")}
          assetId={assetId}
          setting={this.getNotification(NOTIFICATIONS.FundNewsAndUpdates)}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name={NOTIFICATIONS.FundRebalancing}
          label={t("notifications-page.fund.general.fund-rebalancing")}
          assetId={assetId}
          setting={this.getNotification(NOTIFICATIONS.FundRebalancing)}
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

enum NOTIFICATIONS {
  FundNewsAndUpdates = "FundNewsAndUpdates",
  FundRebalancing = "FundRebalancing"
}

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface OwnProps {
  settings: NotificationSettingViewModel[];
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

const FundNotificationsGeneral = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(_FundNotificationsGeneral);
export default FundNotificationsGeneral;
