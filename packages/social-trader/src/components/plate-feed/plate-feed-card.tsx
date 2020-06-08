import classNames from "classnames";
import { DefaultBlock } from "components/default.block/default.block";
import Link from "components/link/link";
import React from "react";
import { getRandomInteger } from "utils/helpers";

import styles from "./plate-feed.module.scss";

interface Props {
  url?: string;
  imageSrc?: string;
  content?: JSX.Element;
}

const PLATE_FEED_CARD_COLORS = ["pink", "cyan"];

const _PlateFeedCard: React.FC<Props> = ({ url, imageSrc, content }) => {
  const color = imageSrc
    ? undefined
    : PLATE_FEED_CARD_COLORS[getRandomInteger(0, 1)];
  return (
    <a
      className={styles["plate-feed__link"]}
      href={url}
      target={"_blank"}
      rel={"noopener noreferrer"}
    >
      <DefaultBlock
        className={classNames({
          // [styles["plate-feed__panel--pink"]]: color === "pink",
          // [styles["plate-feed__panel--cyan"]]: color === "cyan"
        })}
        solid
        horizontalOffsets={false}
        verticalOffsets={false}
      >
        {imageSrc && (
          <div
            className={styles["plate-feed__image"]}
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        )}
        {content && (
          <div className={styles["plate-feed__content"]}>{content}</div>
        )}
      </DefaultBlock>
    </a>
  );
};

export const PlateFeedCard = React.memo(_PlateFeedCard);
