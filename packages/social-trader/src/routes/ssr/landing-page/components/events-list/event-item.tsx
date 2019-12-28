import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import UserIcon from "media/user-avatar.svg";
import React from "react";
import {
  composeManagerDetailsUrl,
  composeProgramDetailsUrl
} from "utils/compose-url";

interface IBestItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  text: string;
  icon: string;
  assetUrl: string;
  userUrl: string;
  value: string;
}

const _EventItem: React.FC<IBestItemProps> = ({
  title,
  text,
  icon,
  assetUrl,
  userUrl,
  value
}) => {
  const linkAsset = assetUrl
    ? {
        pathname: composeProgramDetailsUrl(assetUrl),
        state: `/ ${title}`
      }
    : undefined;
  const linkUser = userUrl
    ? {
        pathname: composeManagerDetailsUrl(userUrl),
        state: `/ ${title}`
      }
    : undefined;
  return (
    <li className="events-list__item">
      <Link className="events-list__item-link" to={linkAsset}>
        <div className="events-list__item-avatar">
          <ImageBase
            DefaultImageComponent={GVProgramDefaultAvatar}
            defaultImageClassName="events-list__item-image--default"
            alt={title}
            imageClassName="events-list__item-image"
            url={icon}
          />
        </div>
      </Link>
      <div className="events-list__item-info">
        <Link className="events-list__item-link" to={linkUser}>
          <div className="events-list__item-title">{title}</div>
        </Link>
        <div className="events-list__item-text">{text}</div>
      </div>
      {value && <div className="events-list__item-number">{value}</div>}
    </li>
  );
};
const EventItem = React.memo(_EventItem);
export default EventItem;
