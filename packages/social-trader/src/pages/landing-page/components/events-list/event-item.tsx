import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import { $primaryColor } from "components/gv-styles/gv-colors/gv-colors";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { PlatformEvent } from "gv-api-web";
import { useTranslation } from "i18n";
import { getElementHeight } from "pages/landing-page/utils";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { composeManagerDetailsUrl, getAssetLink } from "utils/compose-url";

import styles from "./events-list.module.scss";

const ItemLink = styled(Link)`
  color: inherit;
  &:hover {
    color: ${$primaryColor};
  }
`;

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
    <li
      className={styles["events-list__item"]}
      style={{
        transition: `transform 0.5s, opacity 0.5s`,
        opacity: isShow ? "1" : "0",
        transform: transformElement,
        minHeight: `${minHeight}px`
      }}
      ref={itemRef}
    >
      <Link
        title={t("landing-page:links.title", { title, page: "details" })}
        className={styles["events-list__item-link"]}
        to={linkAsset}
      >
        <div className={styles["events-list__item-avatar"]}>
          <ImageBase
            DefaultImageComponent={GVProgramDefaultAvatar}
            defaultImageClassName={styles["events-list__item-image--default"]}
            alt={title}
            color={color}
            className={styles["events-list__item-image"]}
            src={logoUrl}
          />
        </div>
      </Link>
      <div className={styles["events-list__item-info"]}>
        <ItemLink
          title={t("landing-page:links.title", {
            title: userUrl,
            page: "user"
          })}
          className={styles["events-list__item-link"]}
          to={linkUser}
        >
          <div className={styles["events-list__item-title"]}>{title}</div>
        </ItemLink>
        <div className={styles["events-list__item-text"]}>{text}</div>
      </div>
      <div className={styles["events-list__item-values"]}>
        {value && (
          <div className={styles["events-list__item-number"]}>{value}</div>
        )}
        {date && (
          <div className={styles["events-list__item-date"]}>
            {timeConversion(date)}
          </div>
        )}
      </div>
    </li>
  );
};

interface Props extends PlatformEvent {
  startIndex: number;
  index: number;
  countItems: number;
  countShowingItems: number;
  minHeight: number;
  updateMinHeight: (currentHeight: number) => void;
}

const EventItem = React.memo(_EventItem);
export default EventItem;
