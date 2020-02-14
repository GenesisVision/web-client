import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import { PlatformEvent } from "gv-api-web";
import { getElementHeight } from "pages/landing-page/utils";
import React, { useEffect, useRef } from "react";
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
    return `${Math.floor(totalSeconds)} sec ago`;
  }

  const totalMinutes = ms / MS_IN_ONE_MIN;

  if (totalMinutes < 60) {
    const seconds = Math.floor((ms % MS_IN_ONE_MIN) / MS_IN_ONE_SEC);
    const secondsText = seconds ? `${seconds} sec` : ``;
    return `${Math.floor(totalMinutes)} min ${secondsText} ago`;
  }

  const totalHours = ms / MS_IN_ONE_HRS;

  if (totalHours < 24) {
    const minutes = Math.floor((ms % MS_IN_ONE_HRS) / MS_IN_ONE_MIN);
    const minutesText = minutes ? `${minutes} min` : ``;
    return `${Math.floor(totalHours)} hours ${minutesText} ago`;
  }

  const totalDays = ms / MS_IN_ONE_DAY;
  const hours = Math.floor((ms % MS_IN_ONE_DAY) / MS_IN_ONE_HRS);
  const hoursText = hours ? `${hours} hours` : ``;
  return `${Math.floor(totalDays)} days ${hoursText} ago`;
};

const getCurrentIndex = (
  index: number,
  startIndex: number,
  countShowingItems: number,
  countItems: number
) => {
  switch (true) {
    case index > startIndex:
      return index - startIndex;
    case index < startIndex:
      return countItems - startIndex + index;
    default:
      return 0;
  }
};

const isShowing = (
  countShowingItems: number,
  currentIndex: number
): boolean => {
  return currentIndex < countShowingItems;
};

const getPropsAnimation = (
  countShowingItems: number,
  maxHeight: number,
  currentIndex: number,
  isShow: boolean
) => {
  const isLastShowing = currentIndex === countShowingItems;
  const translate3dProp =
    isShow || isLastShowing ? (maxHeight + 20) * currentIndex : 60;
  const scaleProp = isShow || isLastShowing ? 1 : 0.7;
  return {
    to: async (next: any) => {
      next({
        opacity: isShow ? 1 : 0,
        transform: `translate3d(0,${translate3dProp}px,0) scale(${scaleProp})`
      });
      next({ height: maxHeight, delay: 100 });
    },
    from: {
      opacity: 0,
      transform: `translate3d(0,0px,0) scale(1)`
    }
  };
};

interface Props extends PlatformEvent {
  startIndex: number;
  index: number;
  countItems: number;
  countShowingItems: number;
  maxHeight: number;
  updateMaxHeight: (currentHeight: number) => void;
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
  value,
  maxHeight,
  updateMaxHeight
}) => {
  const itemRef = useRef(null);
  const linkUser = userUrl
    ? {
        pathname: composeManagerDetailsUrl(userUrl),
        state: `/ ${title}`
      }
    : undefined;
  const linkAsset = assetUrl
    ? getAssetLink(assetUrl, assetType, title)
    : undefined;
  const currentIndex = getCurrentIndex(
    index,
    startIndex,
    countShowingItems,
    countItems
  );
  const isShow = isShowing(countShowingItems, currentIndex);
  useEffect(() => {
    if (!isShow) return;
    const currentHeight = getElementHeight(itemRef);
    if (maxHeight < currentHeight) updateMaxHeight(currentHeight);
  }, [maxHeight]);
  const props = useSpring(
    getPropsAnimation(countShowingItems, maxHeight, currentIndex, isShow)
  );
  return (
    //@ts-ignore
    <animated.li className="events-list__item" style={props} ref={itemRef}>
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
