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
  url: string;
  value: string;
}

const _EventItem: React.FC<IBestItemProps> = ({
  title,
  text,
  icon,
  url,
  value
}) => {
  const linkProps = url
    ? {
        pathname: composeManagerDetailsUrl(url),
        state: `/ ${title}`
      }
    : undefined;
  console.log(linkProps);
  return (
    <li
      className={classNames("events-list__item", {
        "events-list__item--without-link": !linkProps
      })}
    >
      <Link className="events-list__item-link" to={linkProps}>
        <div className="events-list__item-avatar">
          {/*<ImageBase*/}
          {/*  defaultImage={UserIcon}*/}
          {/*  defaultImageClassName="events-list__item-image--default"*/}
          {/*  imageClassName="events-list__item-image"*/}
          {/*  url={icon}*/}
          {/*  alt={title}*/}
          {/*/>*/}
          <ImageBase
            DefaultImageComponent={GVProgramDefaultAvatar}
            defaultImageClassName="events-list__item-image--default"
            // color={color}
            alt={title}
            imageClassName="events-list__item-image"
            url={icon}
          />
        </div>
        <div className="events-list__item-info">
          <div className="events-list__item-title">{title}</div>
          <div className="events-list__item-text">{text}</div>
        </div>
        {value && <div className="events-list__item-number">{value}</div>}
      </Link>
    </li>
  );
};
const EventItem = React.memo(_EventItem);
export default EventItem;
