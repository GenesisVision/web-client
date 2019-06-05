import { WalletBaseData } from "gv-api-web";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Select, { ISelectChangeEvent } from "shared/components/select/select";

const _FundWithdrawWallet: React.FC<Props> = ({
  t,
  wallets,
  value,
  onChange
}) => {
  const handleChange = useCallback(
    (event: ISelectChangeEvent) => onChange(event.target.value),
    [onChange]
  );
  return (
    <div className="gv-text-field__wrapper">
      <label className="gv-text-field__label gv-text-field__label--shrink">
        {t("withdraw-fund.wallet")}
      </label>
      <div className="gv-text-field">
        <Select
          name="wallet"
          className="gv-text-field__input"
          value={value}
          onChange={handleChange}
        >
          {wallets.map(wallet => {
            return (
              <option value={wallet.currency} key={wallet.currency}>
                <WalletImage
                  imageClassName="transfer-popup__icon"
                  alt={wallet.currency}
                  url={wallet.logo}
                />
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

const FundWithdrawWallet = React.memo(translate()(_FundWithdrawWallet));
export default FundWithdrawWallet;

interface Props extends InjectedTranslateProps {
  wallets: WalletBaseData[];
  value: string;
  onChange(value: string): void;
}
