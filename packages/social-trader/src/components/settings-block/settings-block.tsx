import classNames from "classnames";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import VerificationStatus, {
  IStatusProps
} from "components/verification-status/verification-status";
import React from "react";

import styles from "./settings-block.module.scss";

const SettingsBlock: React.FC<Props> = ({
  hide,
  withBorder = true,
  blockNumber,
  label,
  children,
  checked,
  verificationStatus
}) => (
  <Row
    size={!blockNumber ? "xlarge" : undefined}
    center={false}
    hide={hide}
    className={styles["asset-settings-block"]}
  >
    <div className={styles["asset-settings-block__line-block"]}>
      {blockNumber && <h3>{blockNumber}</h3>}
      <Row
        className={classNames(styles["asset-settings-block__line"], {
          [styles["asset-settings-block__line--bordered"]]: withBorder
        })}
      />
    </div>
    <div className={styles["asset-settings-block__content-block"]}>
      {(label || verificationStatus) && (
        <Row>
          {label && (
            <RowItem>
              <h3>{label}</h3>
            </RowItem>
          )}
          {(checked || !!verificationStatus) && (
            <RowItem>
              <VerificationStatus
                checked={checked}
                verificationStatus={verificationStatus}
              />
            </RowItem>
          )}
        </Row>
      )}
      <Row
        size={"large"}
        wrap
        wide
        className={styles["asset-settings-block__wrapper"]}
      >
        {children}
      </Row>
    </div>
  </Row>
);

interface OwnProps extends IStatusProps {
  hide?: boolean;
  content?: JSX.Element;
  label?: string;
  blockNumber?: string;
  withBorder?: boolean;
}

interface Props extends OwnProps, React.HTMLAttributes<HTMLDivElement> {}

export default SettingsBlock;
