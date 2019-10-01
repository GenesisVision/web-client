import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVProgramAvatar from "shared/components/gv-program-avatar";
import filesService from "shared/services/file-service";

const _NotificationEntity: React.FC<Props> = ({
  t,
  href,
  logo,
  title,
  level,
  color,
  count
}) => (
  <Link
    to={{
      pathname: href,
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
}

const NotificationEntity = translate()(React.memo(_NotificationEntity));
export default NotificationEntity;
