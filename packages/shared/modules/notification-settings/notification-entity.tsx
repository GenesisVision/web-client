import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVProgramAvatar from "shared/components/gv-program-avatar";
import Link from "shared/components/link/link";

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
