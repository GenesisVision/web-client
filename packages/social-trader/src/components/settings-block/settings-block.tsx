import classNames from "classnames";
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
      {blockNumber && <h3>{blockNumber}</h3>}
      <Row
        className={classNames("asset-settings-block__line", {
          "asset-settings-block__line--bordered": withBorder
        })}
      />
    </div>
    <div className="asset-settings-block__content-block">
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
      <Row large wrap wide className="asset-settings-block__wrapper">
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
