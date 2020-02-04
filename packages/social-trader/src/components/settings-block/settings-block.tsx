import "./settings-block.scss";

import classNames from "classnames";
import VerificationStatus, {
  IStatusProps
} from "components/verification-status/verification-status";
import React from "react";

const SettingsBlock: React.FC<Props> = ({
  withBorder = true,
  blockNumber,
  label,
  children,
  checked,
  verificationStatus
}) => (
  <section className="asset-settings-block">
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
        <div className="asset-settings-block__title">
          {label && <h3>{label}</h3>}
          {(checked || !!verificationStatus) && (
            <div className="asset-settings-block__status">
              <VerificationStatus
                checked={checked}
                verificationStatus={verificationStatus}
              />
            </div>
          )}
        </div>
      )}
      <div className="asset-settings-block__wrapper">{children}</div>
    </div>
  </section>
);

interface OwnProps extends IStatusProps {
  content?: JSX.Element;
  label?: string;
  blockNumber?: string;
  withBorder?: boolean;
}
interface Props extends OwnProps, React.HTMLAttributes<HTMLDivElement> {}

export default SettingsBlock;
