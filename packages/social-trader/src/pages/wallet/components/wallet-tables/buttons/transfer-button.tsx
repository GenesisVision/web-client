import ConvertIcon from "media/convert.svg";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

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

interface Props extends WithTranslation, ParentWalletButtonProps {}

const TransferButton = translate()(React.memo(_TransferButton));
export default TransferButton;
