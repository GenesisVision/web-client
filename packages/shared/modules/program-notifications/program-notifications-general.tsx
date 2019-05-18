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
  addProgramNotification,
  removeProgramNotification
} from "./services/program-notifications.services";

class ProgramNotificationsGeneral extends React.PureComponent<Props> {
  getNotification = (
    type: NotificationSettingViewModelTypeEnum
  ): NotificationSettingViewModel =>
    this.props.settings.find(setting => setting.type === type)!;

  handleAdd = (options: IAddNotificationSettingProps) => {
    const { service, t } = this.props;
    return service
      .addProgramNotification(options)
      .then(() =>
        service.success(
          t(`notifications-page.program.general.${options.type}.enabled-alert`)
        )
      );
  };

  handleRemove = (options: IRemoveNotificationSettingProps) => {
    const { service, t } = this.props;
    return service
      .removeProgramNotification(options)
      .then(() =>
        service.success(
          t(`notifications-page.program.general.${options.type}.disabled-alert`)
        )
      );
  };

  render() {
    const { t, assetId } = this.props;
    return (
      <div className="notification-settings">
        <h3 className="notification-settings__subtitle">
          {t("notifications-page.program.general.title")}
        </h3>
        <GeneralNotification
          name={NOTIFICATIONS.ProgramNewsAndUpdates}
          label={t("notifications-page.program.general.news-updates")}
          assetId={assetId}
          setting={this.getNotification(NOTIFICATIONS.ProgramNewsAndUpdates)}
          addNotification={this.handleAdd}
          removeNotification={this.handleRemove}
        />
        <GeneralNotification
          name={NOTIFICATIONS.ProgramEndOfPeriod}
          label={t("notifications-page.program.general.end-of-period")}
          assetId={assetId}
          setting={this.getNotification(NOTIFICATIONS.ProgramEndOfPeriod)}
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
      addProgramNotification: addProgramNotification,
      removeProgramNotification: removeProgramNotification
    },
    dispatch
  )
});

enum NOTIFICATIONS {
  ProgramNewsAndUpdates = "ProgramNewsAndUpdates",
  ProgramEndOfPeriod = "ProgramEndOfPeriod"
}

interface Props extends DispatchProps, OwnProps, InjectedTranslateProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  success: typeof alertMessageActions.success;
  addProgramNotification: typeof addProgramNotification;
  removeProgramNotification: typeof removeProgramNotification;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  settings: NotificationSettingViewModel[];
  assetId: string;
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(ProgramNotificationsGeneral);
