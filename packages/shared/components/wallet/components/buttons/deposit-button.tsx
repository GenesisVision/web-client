import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import { CHIP_TYPE } from "shared/components/chip/chip";

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

interface Props extends InjectedTranslateProps, ParentWalletButtonProps {}

const DepositButton = React.memo(translate()(_DepositButton));
export default DepositButton;
