import "./notifications.scss";

import { NotificationList, NotificationViewModel } from "gv-api-web";
import moment from "moment";
import { NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { Icon } from "shared/components/icon/icon";
import { RingIcon } from "shared/components/icon/ring-icon";
import InfinityScroll from "shared/components/infinity-scroll/inifinity-scroll";
import NotificationsGroup from "shared/components/notifications/components/notification-group/notification-group";
import Spinner from "shared/components/spiner/spiner";

type OwnProps = {
  fetchNotifications(): Promise<NotificationList>;
  clearNotifications(): void;
  closeNotifications(): void;
  count: number;
  total: number;
  notifications: NotificationViewModel[];
};

type Props = OwnProps & WithTranslation;

type NotificationGroups = { [name: number]: NotificationViewModel[] };

class Notifications extends React.Component<Props> {
  state = {
    isPending: false
  };

  static defaultProps = {
    notifications: [],
    total: 0
  };

  parseDate = (unix: number): string => {
    const { t } = this.props;
    return moment
      .unix(unix)
      .calendar(undefined, {
        sameDay: `[${t("notifications-aside.today")}], DD MMMM`,
        lastDay: `[${t("notifications-aside.yesterday")}], DD MMMM`,
        lastWeek: "dddd, DD MMMM",
        sameElse: "dddd, DD MMMM"
      })
      .toUpperCase();
  };

  fetchNotification = () => {
    if (this.state.isPending) return;
    this.setState({ isPending: true });
    this.props
      .fetchNotifications()
      .then(() => {
        this.setState({ isPending: false });
      })
      .catch(() => this.setState({ isPending: false }));
  };

  getGroups = (notifications: NotificationViewModel[]) => {
    return notifications.reduce<NotificationGroups>((acc, notification) => {
      const key = moment(notification.date)
        .startOf("day")
        .unix();

      if (!Array.isArray(acc[key])) {
        acc[key] = [];
      }
      acc[key].push(notification);
      return acc;
    }, {});
  };

  renderGroups = (groups: NotificationGroups) => (
    group: string
  ): React.ReactNode => (
    <NotificationsGroup
      key={group}
      title={this.parseDate(parseInt(group))}
      notifications={groups[parseInt(group)]}
    />
  );

  sortGroups = (a: string, b: string) => parseInt(b) - parseInt(a);

  componentDidMount() {
    this.fetchNotification();
  }

  componentWillUnmount() {
    this.props.clearNotifications();
  }

  render() {
    const { t } = this.props;
    const { notifications, total, count } = this.props;
    const groups = this.getGroups(notifications);
    const hasMore = total > notifications.length;
    const hasNotifications = count > 0;
    return (
      <div className="notifications">
        <InfinityScroll loadMore={this.fetchNotification} hasMore={hasMore}>
          <div className="notifications__header">
            <div className="notifications__ring">
              <RingIcon />
            </div>
            {t("notifications-aside.header")}
            <div className="notifications__count">
              <Chip type={hasNotifications ? CHIP_TYPE.NEGATIVE : undefined}>
                {count}
              </Chip>
            </div>
            <Link
              to={NOTIFICATIONS_ROUTE}
              onClick={this.props.closeNotifications}
            >
              <div className="profile-avatar notifications__link">
                <Icon type={"controls"} />
              </div>
            </Link>
          </div>
          <div className="notifications__content">
            {Object.keys(groups)
              .sort(this.sortGroups)
              .map<React.ReactNode>(this.renderGroups(groups))}
            <Spinner isShown={this.state.isPending} />
          </div>
        </InfinityScroll>
      </div>
    );
  }
}

export default withTranslation()(Notifications);
