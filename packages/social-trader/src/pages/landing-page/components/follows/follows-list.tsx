import classNames from "classnames";
import { FollowDetailsListItem } from "gv-api-web";
import React from "react";

import FollowsItem from "./follows-item";
import styles from "./follows-list.module.scss";

interface Props {
  className?: string;
  follows: FollowDetailsListItem[];
}

const _FollowsList: React.FC<Props> = ({ className, follows }) => (
  <ul className={classNames(styles["follows-list"], className)}>
    {follows.map(follow => (
      <FollowsItem
        key={follow.id}
        title={follow.title}
        logo={follow.logoUrl}
        color={follow.color}
        count={follow.subscribersCount}
        url={follow.url}
      />
    ))}
  </ul>
);

const FollowsList = React.memo(_FollowsList);
export default FollowsList;
