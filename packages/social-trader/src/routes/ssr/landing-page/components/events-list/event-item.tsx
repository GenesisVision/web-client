import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import { PlatformEvent } from "gv-api-web";
import React from "react";
import { animated, config, useSpring } from "react-spring";
import { composeManagerDetailsUrl, getAssetLink } from "utils/compose-url";

interface Props extends PlatformEvent {
  startIndex: number;
  index: number;
  countItems: number;
  countShowingItems: number;
}

const _EventItem: React.FC<Props> = ({
  startIndex,
  index,
  countItems,
  countShowingItems,
  title,
  text,
  icon,
  assetUrl,
  userUrl,
  color,
  assetType,
  value
}) => {
  let currentIndex = null;
  switch (true) {
    case index > startIndex:
      currentIndex = index - startIndex;
      break;
    case index < startIndex:
      currentIndex = countItems - startIndex + index;
      break;
    default:
      currentIndex = 0;
  }
  const isShow = currentIndex < countShowingItems;
  const isLastShowing = currentIndex === countShowingItems;
  const linkAsset = assetUrl
    ? getAssetLink(assetUrl, assetType, title)
    : undefined;
  const linkUser = userUrl
    ? {
        pathname: composeManagerDetailsUrl(userUrl),
        state: `/ ${title}`
      }
    : undefined;
  const translate3dProp = isShow || isLastShowing ? 120 * currentIndex : 60;
  const scaleProp = isShow || isLastShowing ? 1 : 0.7;
  const props = useSpring({
    to: {
      opacity: isShow ? 1 : 0,
      transform: `translate3d(0,${translate3dProp}px,0) scale(${scaleProp}`
    }
  });
  return (
    <animated.li
      className="events-list__item"
      style={props}
      data-index={currentIndex}
    >
      <Link className="events-list__item-link" to={linkAsset}>
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
        <Link className="events-list__item-link" to={linkUser}>
          <div className="events-list__item-title">{title}</div>
        </Link>
        <div className="events-list__item-text">{text}</div>
      </div>
      {value && <div className="events-list__item-number">{value}</div>}
    </animated.li>
  );
};
const EventItem = React.memo(_EventItem);
export default EventItem;
