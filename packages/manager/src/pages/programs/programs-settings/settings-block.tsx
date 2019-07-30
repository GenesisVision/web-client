import React from "react";

const _SettingsBlock: React.FC<Props> = ({ label, content }) => (
  <section className="program-settings__block">
    <h3>{label}</h3>
    <div className="program-settings__block-wrapper">{content}</div>
  </section>
);

interface OwnProps {
  label: string;
  content: JSX.Element;
}
interface Props extends OwnProps {}

const SettingsBlock = React.memo(_SettingsBlock);
export default SettingsBlock;
