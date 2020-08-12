import clsx from "clsx";
import { Button } from "components/button/button";
import { DefaultBlock } from "components/default.block/default.block";
import Link, { ToType } from "components/link/link";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import DashboardHorizontalWindowList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-window-list";
import { InvestAssetType } from "pages/invest/invest.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { ListChildComponentProps } from "react-window";

import styles from "./asset-block.module.scss";

export enum DETAILS_BLOCK_TYPE {
  SOLID = "SOLID",
  BORDERED = "BORDERED",
  TRANSPARENT = "TRANSPARENT"
}

const ASSET_WIDTH = 312;
const ASSET_HEIGHT = 390;
const OFFSET_WIDTH = 20;
const CELL_WIDTH = ASSET_WIDTH + OFFSET_WIDTH;
const CONTAINER_WIDTH = Math.round(CELL_WIDTH * 2.6);

export const AssetBlock: React.FC<Props> = ({
  buttonLabel,
  blockType,
  left,
  side,
  investLink,
  assets,
  renderCard,
  description,
  title
}) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock
      size={"large"}
      wide
      solid={!blockType}
      className={clsx(styles["asset-block"], {
        [styles["asset-block--left"]]: left,
        [styles["asset-block--side"]]: side
      })}
    >
      <div
        className={clsx(styles["asset-block__description-block"], {
          [styles["asset-block__description-block--side"]]: side
        })}
      >
        <Row>
          <h2>{title}</h2>
        </Row>
        <Row
          className={clsx(styles["asset-block__description"], {
            [styles["asset-block__description--side"]]: side
          })}
        >
          <Text muted>{description}</Text>
        </Row>
        <Row size={"xlarge"}>
          <Link to={investLink}>
            <Button size={"large"} color="primary">
              {buttonLabel || t("invest:invest-button")}
            </Button>
          </Link>
        </Row>
      </div>
      <div className={styles["asset-block__assets-block"]}>
        <DashboardHorizontalWindowList
          darkShadow={blockType === DETAILS_BLOCK_TYPE.TRANSPARENT}
          items={assets}
          height={ASSET_HEIGHT}
          itemWidth={CELL_WIDTH}
          width={CONTAINER_WIDTH}
          renderItem={renderCard}
        />
      </div>
    </DefaultBlock>
  );
};

interface Props {
  buttonLabel?: string;
  blockType?: DETAILS_BLOCK_TYPE;
  left?: boolean;
  side?: boolean;
  investLink: ToType;
  title: string;
  description: string;
  renderCard: React.FC<ListChildComponentProps>;
  assets: InvestAssetType[];
}
