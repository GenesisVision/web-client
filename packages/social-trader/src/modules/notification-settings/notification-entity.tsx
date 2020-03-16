import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _NotificationEntity: React.FC<Props> = ({
  levelProgress,
  href,
  logo,
  title,
  level,
  color,
  count,
  pathname
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  return (
    <div className="notification-entity">
      <Link to={linkCreator(href, pathname, t("notifications-page.title"))}>
        <AssetAvatarWithName
          levelProgress={levelProgress}
          name={title}
          url={logo}
          alt={title}
          level={level}
          color={color}
        />
      </Link>
      <div className="notification-entity__count">{count}</div>
    </div>
  );
};

interface Props {
  href: string;
  logo: string;
  title: string;
  count: number;
  color?: string;
  level?: number;
  levelProgress?: number;
  pathname: string;
}

const NotificationEntity = React.memo(_NotificationEntity);
export default NotificationEntity;
