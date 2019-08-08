import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import CloseAsset from "./close-asset/close-asset";
import ClosePeriod from "./close-period/close-period";
import SettingsBlock from "./settings-block";

const _PeriodAndClosing: React.FC<Props> = ({
  t,
  id,
  canClosePeriod,
  canCloseAsset,
  closePeriod,
  closeAsset
}) => (
  <SettingsBlock
    label={t("manager.asset-settings.period-and-closing.title")}
    content={
      <>
        <ClosePeriod canClose={canClosePeriod} onApply={closePeriod} id={id} />
        <CloseAsset canClose={canCloseAsset} onApply={closeAsset} id={id} />
      </>
    }
  />
);

interface Props extends WithTranslation {
  id: string;
  canClosePeriod: boolean;
  canCloseAsset: boolean;
  closePeriod: () => void;
  closeAsset: () => void;
}

const PeriodAndClosing = translate()(React.memo(_PeriodAndClosing));
export default PeriodAndClosing;
