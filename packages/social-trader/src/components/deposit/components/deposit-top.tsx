import { ASSET } from "constants/constants";
import InvestPopupTop from "modules/invest-popup/invest-popup-top";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export interface DepositTopOwnProps {
  ownAsset?: boolean;
  currency?: CurrencyEnum;
  title?: string;
  availableToInvest?: number;
  asset: ASSET;
  header?: string;
}

const _DepositTop: React.FC<DepositTopOwnProps> = ({
  ownAsset,
  header,
  asset,
  title: subtitle,
  currency,
  availableToInvest
}) => {
  const [t] = useTranslation();
  const title = ownAsset
    ? t("deposit-asset.own-title")
    : t("deposit-asset.title");

  return asset === ASSET.PROGRAM && !ownAsset && !!availableToInvest ? (
    <InvestPopupTop
      title={header || title}
      subtitle={subtitle || asset}
      labelText={t("deposit-asset.program.available-to-invest")}
      text={t(
        `${formatCurrencyValue(availableToInvest, currency!)} ${currency}`
      )}
    />
  ) : (
      <InvestPopupTop title={header || title} subtitle={subtitle || asset} />
    );
};

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
