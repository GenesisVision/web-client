import SettingsBlock from "components/settings-block/settings-block";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ASSET } from "shared/constants/constants";

import CloseAsset from "./close-asset/close-asset";
import ClosePeriod from "./close-period/close-period";

const _PeriodAndClosing: React.FC<Props> = ({
  asset,
  t,
  label = t("asset-settings.period-and-closing.title"),
  id,
  canClosePeriod,
  canCloseAsset,
  closePeriod = () => {},
  closeAsset
}) => (
  <SettingsBlock label={label}>
    <ClosePeriod condition={!!canClosePeriod} onApply={closePeriod} id={id} />
    <CloseAsset
      asset={asset}
      canClose={canCloseAsset}
      onApply={closeAsset}
      id={id}
    />
  </SettingsBlock>
);

interface Props extends WithTranslation {
  label?: string;
  asset: ASSET;
  id: string;
  canClosePeriod?: boolean;
  canCloseAsset: boolean;
  closeAsset: () => void;
  closePeriod?: () => void;
}

const PeriodAndClosing = translate()(React.memo(_PeriodAndClosing));
export default PeriodAndClosing;
