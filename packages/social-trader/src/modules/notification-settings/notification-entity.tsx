import GVProgramAvatar from "components/gv-program-avatar";
import Link from "components/link/link";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _NotificationEntity: React.FC<Props> = ({
  t,
  href,
  logo,
  title,
  level,
  color,
  count,
  pathname
}) => (
  <Link
    to={{
      pathname,
      as: href,
      state: `/ ${t("notifications-page.title")}`
    }}
  >
    <div className="notification-entity">
      <GVProgramAvatar url={logo} alt={title} level={level} color={color} />
      <div className="notification-entity__title">{title}</div>
      <div className="notification-entity__count">{count}</div>
    </div>
  </Link>
);

interface Props extends WithTranslation {
  href: string;
  logo: string;
  title: string;
  count: number;
  color?: string;
  level?: number;
  pathname: string;
}

const NotificationEntity = translate()(React.memo(_NotificationEntity));
export default NotificationEntity;
