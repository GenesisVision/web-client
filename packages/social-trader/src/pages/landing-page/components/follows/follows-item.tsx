import clsx from "clsx";
import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { useTranslation } from "i18n";
import React from "react";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";

import styles from "./follows-list.module.scss";

interface ITraderItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  count: number;
  color: string;
  url: string;
  logo: string;
  imageClassName?: string;
}

const _FollowsItem: React.FC<ITraderItemProps> = ({
  title,
  count,
  color,
  url,
  logo,
  imageClassName
}) => {
  const { t } = useTranslation();
  const { linkCreator } = useToLink();
  const linkProps = linkCreator(
    composeFollowDetailsUrl(url),
    FOLLOW_DETAILS_FOLDER_ROUTE
  );
  return (
    <li className={styles["follows-list__item"]}>
      <Link
        title={t("landing-page:links.title", { title, page: "details" })}
        className={styles["follows-list__item-link"]}
        to={linkProps}
      >
        <div className={styles["follows-list__item-avatar"]}>
          <ImageBase
            DefaultImageComponent={GVProgramDefaultAvatar}
            defaultImageClassName={styles["follows-list__item-image--default"]}
            color={color}
            alt={title}
            className={clsx(styles["follows-list__item-image"], imageClassName)}
            src={logo}
          />
        </div>
        <div className={styles["follows-list__item-title"]}>{title}</div>
        <div className={styles["follows-list__item-data"]}>
          <div className={styles["follows-list__item-number"]}>{count}</div>
          <span className={styles["follows-list__item-label"]}>
            {t("landing-page:follows.followers")}
          </span>
        </div>
      </Link>
    </li>
  );
};
const FollowsItem = React.memo(_FollowsItem);
export default FollowsItem;
