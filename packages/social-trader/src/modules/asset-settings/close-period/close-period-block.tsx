import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import React from "react";
import { useTranslation } from "react-i18next";

import ClosePeriod from "./close-period";

interface Props {
  label?: string;
  id: string;
  closePeriod?: () => void;
}

const _ClosePeriodBlock: React.FC<Props> = ({
  label,
  id,
  closePeriod = () => {}
}) => {
  const [t] = useTranslation();
  return (
    <SettingsBlock label={label || t("asset-settings:close-period.title")}>
      <ClosePeriod onApply={closePeriod} id={id} />
    </SettingsBlock>
  );
};

const ClosePeriodBlock = withLoader(React.memo(_ClosePeriodBlock));
export default ClosePeriodBlock;
