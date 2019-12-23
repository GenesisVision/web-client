import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import UserIcon from "media/user-avatar.svg";
import React from "react";

interface ITraderItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  data: string;
  url?: string;
  imageClassName?: string;
}

const _TraderItem: React.FC<ITraderItemProps> = ({
  title,
  data,
  url,
  imageClassName
}) => (
  <li className="traders-list__item">
    <div className="traders-list__item-avatar">
      <ImageBase
        defaultImage={UserIcon}
        defaultImageClassName="traders-list__item-image--default"
        imageClassName={classNames("traders-list__item-image", imageClassName)}
        url={url}
      />
    </div>
    <div className="traders-list__item-title">{title}</div>
    <div className="traders-list__item-data">
      <div className="traders-list__item-number">{data}</div>
      <span className="traders-list__item-label">Followers</span>
    </div>
  </li>
);
const TraderItem = React.memo(_TraderItem);
export default TraderItem;
