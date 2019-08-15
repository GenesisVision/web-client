import React from "react";
import VerificationStatus, {
  IStatusProps
} from "shared/components/verification-status/verification-status";

const _SettingsBlock: React.FC<Props> = ({
  label,
  content,
  checked,
  verificationStatus
}) => (
  <section className="asset-settings__block">
    {label && <h3>{label}</h3>}
    {checked ||
      (!!verificationStatus && (
        <VerificationStatus
          checked={checked}
          verificationStatus={verificationStatus}
        />
      ))}
    <div className="asset-settings__block-wrapper">{content}</div>
  </section>
);

interface OwnProps extends IStatusProps {
  content?: JSX.Element;
  label?: string;
}
interface Props extends OwnProps {}

const SettingsBlock = React.memo(_SettingsBlock);
export default SettingsBlock;
