import ArrowIcon from "media/arrow-up.svg";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import WalletButton, { ParentWalletButtonProps } from "./wallet-button";

export const _WithdrawButton: React.FC<Props> = ({
  t,
  handleOpen,
  disabled
}) => (
  <WalletButton
    title={t("wallet-page.buttons.withdraw")}
    handleOpen={handleOpen}
    className="wallet-list__withdraw"
    disabled={disabled}
  >
    <img src={ArrowIcon} alt={t("wallet-page.buttons.withdraw")} />
  </WalletButton>
);

interface Props extends WithTranslation, ParentWalletButtonProps {}

const WithdrawButton = translate()(React.memo(_WithdrawButton));
export default WithdrawButton;
