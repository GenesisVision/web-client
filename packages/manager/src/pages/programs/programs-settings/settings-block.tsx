import React from "react";

const _SettingsBlock: React.FC<Props> = ({ label, content }) => (
  <section className="program-settings__block">
    {label && <h3>{label}</h3>}
    <div className="program-settings__block-wrapper">{content}</div>
  </section>
);

interface OwnProps {
  content: JSX.Element;
  label?: string;
}
interface Props extends OwnProps {}

const SettingsBlock = React.memo(_SettingsBlock);
export default SettingsBlock;
