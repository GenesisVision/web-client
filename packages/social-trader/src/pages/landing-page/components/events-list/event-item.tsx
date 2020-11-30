import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import { useToLink } from "components/link/link.helper";
import { PlatformEvent } from "gv-api-web";
import { useTranslation } from "i18n";
import {
  EventItemAvatarContainer,
  EventItemDate,
  EventItemImage,
  EventItemInfo,
  EventItemLi,
  EventItemLink,
  EventItemNumber,
  EventItemText,
  EventItemTitle,
  EventItemValues
} from "pages/landing-page/components/events-list/events-list.styles";
import { getElementHeight } from "pages/landing-page/utils";
import React, { useEffect, useRef, useState } from "react";
import { composeManagerDetailsUrl, getAssetLink } from "utils/compose-url";

interface Props extends PlatformEvent {
  startIndex: number;
  index: number;
  countItems: number;
  countShowingItems: number;
  minHeight: number;
  updateMinHeight: (currentHeight: number) => void;
}

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

const _EventItem: React.FC<Props> = ({
  startIndex,
  index,
  countItems,
  countShowingItems,
  title,
  text,
  logoUrl,
  assetUrl,
  userUrl,
  color,
  assetType,
  date,
  value,
  minHeight,
  updateMinHeight
}) => {
  const { t } = useTranslation();
  const { contextTitle } = useToLink();
  const [currentHeight, setCurrentHeight] = useState(0);
  const [transformElement, setTransformElement] = useState(
    "translate3d(0,0px,0) scale(1)"
  );
  const itemRef = useRef(null);
  const linkUser = userUrl
    ? {
        pathname: composeManagerDetailsUrl(userUrl),
        state: `/ ${title}`
      }
    : undefined;
  const linkAsset = assetUrl
    ? getAssetLink(assetUrl, assetType, contextTitle)
    : undefined;
  const currentIndex = getCurrentIndex(
    index,
    startIndex,
    countShowingItems,
    countItems
  );
  const isShow = isShowing(countShowingItems, currentIndex);
  const isLastShowing = currentIndex === countShowingItems;
  useEffect(() => {
    const heightElement = getElementHeight(itemRef);
    setCurrentHeight(heightElement);
    if (minHeight < heightElement) {
      updateMinHeight(heightElement);
    }
  }, [minHeight, currentHeight]);
  useEffect(() => {
    const translate3d =
      isShow || isLastShowing ? (minHeight + 20) * currentIndex : 60;
    const scale = isShow || isLastShowing ? 1 : 0.7;
    setTransformElement(`translate3d(0,${translate3d}px,0) scale(${scale})`);
  }, [currentHeight, currentIndex]);
  return (
    <EventItemLi
      isShow={isShow}
      transform={transformElement}
      minHeight={minHeight}
      ref={itemRef}
    >
      <EventItemLink
        title={t("landing-page:links.title", { title, page: "details" })}
        to={linkAsset}
      >
        <EventItemAvatarContainer>
          <EventItemImage
            DefaultImageComponent={GVProgramDefaultAvatar}
            alt={title}
            color={color}
            src={logoUrl}
          />
        </EventItemAvatarContainer>
      </EventItemLink>
      <EventItemInfo>
        <EventItemLink
          title={t("landing-page:links.title", {
            title: userUrl,
            page: "user"
          })}
          to={linkUser}
        >
          <EventItemTitle>{title}</EventItemTitle>
        </EventItemLink>
        <EventItemText>{text}</EventItemText>
      </EventItemInfo>
      <EventItemValues>
        {value && <EventItemNumber>{value}</EventItemNumber>}
        {date && <EventItemDate>{timeConversion(date)}</EventItemDate>}
      </EventItemValues>
    </EventItemLi>
  );
};

const EventItem = React.memo(_EventItem);
export default EventItem;
