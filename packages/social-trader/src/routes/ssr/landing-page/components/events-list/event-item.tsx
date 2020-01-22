import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import { PlatformEvent } from "gv-api-web";
import React from "react";
import { animated, useSpring } from "react-spring";
import { composeManagerDetailsUrl, getAssetLink } from "utils/compose-url";

const timeConversion = (date: Date) => {
  const MS_IN_ONE_SEC = 1000;
  const MS_IN_ONE_MIN = 1000 * 60;
  const MS_IN_ONE_HRS = 1000 * 60 * 60;
  const MS_IN_ONE_DAY = 1000 * 60 * 60 * 24;

  const nowTime = new Date().getTime();
  const endTime = new Date(date).getTime();
  const ms = nowTime - endTime;
  const totalSeconds = ms / MS_IN_ONE_SEC;

  if (totalSeconds < 60) {
    return `${Math.floor(totalSeconds)} sec`;
  }

  const totalMinutes = ms / MS_IN_ONE_MIN;

  if (totalMinutes < 60) {
    const seconds = (ms % MS_IN_ONE_MIN) / MS_IN_ONE_SEC;
    return `${Math.floor(totalMinutes)} min ${Math.floor(seconds)} sec`;
  }

  const totalHours = ms / MS_IN_ONE_HRS;

  if (totalHours < 24) {
    const minutes = (ms % MS_IN_ONE_HRS) / MS_IN_ONE_MIN;
    return `${Math.floor(totalHours)} hrs ${Math.floor(minutes)} min`;
  }

  const totalDays = ms / MS_IN_ONE_DAY;
  const hours = (ms % MS_IN_ONE_DAY) / MS_IN_ONE_HRS;
  return `${Math.floor(totalDays)} days ${Math.floor(hours)} hrs`;
};

const getPropsAnimation = (
  index: number,
  startIndex: number,
  countShowingItems: number,
  countItems: number
) => {
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
  const translate3dProp = isShow || isLastShowing ? 120 * currentIndex : 60;
  const scaleProp = isShow || isLastShowing ? 1 : 0.7;
  return {
    to: {
      opacity: isShow ? 1 : 0,
      transform: `translate3d(0,${translate3dProp}px,0) scale(${scaleProp}`
    }
  };
};

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
  date,
  value
}) => {
  const props = useSpring(
    getPropsAnimation(index, startIndex, countShowingItems, countItems)
  );
  const linkUser = userUrl
    ? {
        pathname: composeManagerDetailsUrl(userUrl),
        state: `/ ${title}`
      }
    : undefined;
  const linkAsset = assetUrl
    ? getAssetLink(assetUrl, assetType, title)
    : undefined;
  return (
    <animated.li className="events-list__item" style={props}>
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
      <div className="events-list__item-values">
        {value && <div className="events-list__item-number">{value}</div>}
        {date && (
          <div className="events-list__item-date">{timeConversion(date)}</div>
        )}
      </div>
    </animated.li>
  );
};
const EventItem = React.memo(_EventItem);
export default EventItem;
