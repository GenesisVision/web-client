import classNames from "classnames";
import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import VerificationStatus, {
  IStatusProps
} from "components/verification-status/verification-status";
import React from "react";

import "./settings-block.scss";

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
    xlarge={!blockNumber}
    center={false}
    hide={hide}
    className="asset-settings-block"
  >
    <div className="asset-settings-block__line-block">
      {blockNumber && (
        <div className="asset-settings-block__title">
          <h3>{blockNumber}</h3>
        </div>
      )}
      <div
        className={classNames("asset-settings-block__line", {
          "asset-settings-block__line--bordered": withBorder
        })}
      />
    </div>
    <div className="asset-settings-block__content-block">
      {(label || verificationStatus) && (
        <Center className="asset-settings-block__title">
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
        </Center>
      )}
      <div className="asset-settings-block__wrapper">{children}</div>
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
