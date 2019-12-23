import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import UserIcon from "media/user-avatar.svg";
import React from "react";

interface IBestItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title?: string;
  text?: string;
  data?: string;
  url?: string;
  imageClassName?: string;
}

const _BestItem: React.FC<IBestItemProps> = ({
  title,
  text,
  url,
  data,
  imageClassName
}) => (
  <li className="best-list__item">
    <div className="best-list__item-avatar">
      <ImageBase
        defaultImage={UserIcon}
        defaultImageClassName="best-list__item-image--default"
        imageClassName={classNames("best-list__item-image", imageClassName)}
        url={url}
      />
    </div>
    <div className="best-list__item-info">
      {title && <div className="best-list__item-title">{title}</div>}
      {text && <div className="best-list__item-text">{text}</div>}
    </div>
    {data && <div className="best-list__item-number">{data}</div>}
  </li>
);
const BestItem = React.memo(_BestItem);
export default BestItem;
