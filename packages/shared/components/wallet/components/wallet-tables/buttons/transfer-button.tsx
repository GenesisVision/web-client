import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import ConvertIcon from "shared/media/convert.svg";

import WalletButton, { ParentWalletButtonProps } from "./wallet-button";

export const _TransferButton: React.FC<Props> = ({ t, handleOpen }) => (
  <WalletButton
    title={t("wallet-page.buttons.internal-transfer")}
    handleOpen={handleOpen}
    className="wallet-list__button-transfer"
  >
    <img src={ConvertIcon} alt="Convert Icon" />
  </WalletButton>
);

interface Props extends InjectedTranslateProps, ParentWalletButtonProps {}

const TransferButton = translate()(React.memo(_TransferButton));
export default TransferButton;
