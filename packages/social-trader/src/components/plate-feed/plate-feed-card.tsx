import classNames from "classnames";
import { DefaultBlock } from "components/default.block/default.block";
import React from "react";
import { getRandomInteger } from "utils/helpers";

import styles from "./plate-feed.module.scss";

interface Props {
  imageSrc?: string;
  content?: JSX.Element;
}

const PLATE_FEED_CARD_COLORS = ["pink", "cyan"];

const _PlateFeedCard: React.FC<Props> = ({ imageSrc, content }) => {
  const color = imageSrc
    ? undefined
    : PLATE_FEED_CARD_COLORS[getRandomInteger(0, 1)];
  return (
    <div className={styles["plate-feed__panel"]}>
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
    </div>
  );
};

export const PlateFeedCard = React.memo(_PlateFeedCard);
