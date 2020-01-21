import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import { PlatformEvent } from "gv-api-web";
import React from "react";
import { composeManagerDetailsUrl, getAssetLink } from "utils/compose-url";

const _EventItem: React.FC<PlatformEvent> = ({
  title,
  text,
  icon,
  assetUrl,
  userUrl,
  color,
  assetType,
  value
}) => {
  const linkAsset = assetUrl
    ? getAssetLink(assetUrl, assetType, title)
    : undefined;
  const linkUser = userUrl
    ? {
        pathname: composeManagerDetailsUrl(userUrl),
        state: `/ ${title}`
      }
    : undefined;
  return (
    <li className="events-list__item">
      <Link
        title={`Go to ${title} details page`}
        className="events-list__item-link"
        to={linkAsset}
      >
        <div className="events-list__item-avatar">
          <ImageBase
            DefaultImageComponent={GVProgramDefaultAvatar}
            defaultImageClassName="events-list__item-image--default"
            alt={title}
            color={color}
            className="events-list__item-image"
            src={icon}
          />
        </div>
      </Link>
      <div className="events-list__item-info">
        <Link
          title={`Go to ${userUrl} user page`}
          className="events-list__item-link"
          to={linkUser}
        >
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
