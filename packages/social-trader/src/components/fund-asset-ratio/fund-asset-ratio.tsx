import classNames from "classnames";
import { Row } from "components/row/row";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";

import styles from "./fund-assets-ratio.module.scss";

const _FundAssetRatio: React.FC<Props> = ({
  showBounds = true,
  values,
  handleHover,
  handleLeave
}) => {
  let ZIndex = values.length;
  let newLevel = 0;
  return (
    <>
      <div
        className={classNames(
          styles["fund-asset-ratio"],
          styles["fund-asset-ratio--line"]
        )}
      >
        {values.map((item: FundAssetPartWithIcon) => {
          newLevel += item.percent;
          ZIndex--;
          return (
            <RatioField
              key={item.name}
              handleHover={handleHover}
              handleLeave={handleLeave}
              item={item}
              newLevel={newLevel}
              ZIndex={ZIndex}
            />
          );
        })}
      </div>
      {showBounds && (
        <Row size={"small"} className={styles["fund-asset-ratio__values"]}>
          <div className={styles["fund-asset-ratio__value"]}>0%</div>
          <div
            className={classNames(styles["fund-asset-ratio__value"], {
              [styles["fund-asset-ratio__value--full"]]:
                values.reduce(
                  (sum: number, item: FundAssetPartWithIcon): number =>
                    sum + item.percent,
                  0
                ) === 100
            })}
          >
            100%
          </div>
        </Row>
      )}
    </>
  );
};

const RatioField: React.FC<IRatioFieldProps> = React.memo(
  ({ handleHover, item, handleLeave, newLevel, ZIndex }) => (
    <div
      className={styles["fund-asset-ratio--item-line"]}
      onMouseOver={handleHover && handleHover(item.asset)}
      onMouseLeave={handleLeave && handleLeave}
      style={{
        width: `${newLevel}%`,
        background: item.color,
        zIndex: ZIndex
      }}
    />
  )
);

interface IRatioFieldProps {
  handleHover?: (
    asset: string
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  item: FundAssetPartWithIcon;
  handleLeave?: () => void;
  newLevel: number;
  ZIndex: number;
}

interface Props {
  showBounds?: boolean;
  values: FundAssetPartWithIcon[];
  handleHover?: (
    asset: string
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleLeave?: () => void;
}

const FundAssetRatio = React.memo(_FundAssetRatio);
export default FundAssetRatio;
