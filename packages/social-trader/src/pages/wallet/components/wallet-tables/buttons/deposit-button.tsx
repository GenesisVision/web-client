import { CHIP_TYPE } from "components/chip/chip";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import WalletButton, { ParentWalletButtonProps } from "./wallet-button";

export const _DepositButton: React.FC<Props> = ({
  t,
  handleOpen,
  disabled
}) => (
  <WalletButton
    title={t("wallet-page.buttons.deposit")}
    chipType={CHIP_TYPE.POSITIVE}
    handleOpen={handleOpen}
    disabled={disabled}
    className="wallet-list__button-add-funds"
  >
    +
  </WalletButton>
);

interface Props extends WithTranslation, ParentWalletButtonProps {}

const DepositButton = translate()(React.memo(_DepositButton));
export default DepositButton;
