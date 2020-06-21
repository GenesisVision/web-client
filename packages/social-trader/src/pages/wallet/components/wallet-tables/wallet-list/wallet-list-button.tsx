import Link from "components/link/link";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { WalletData } from "gv-api-web";
import LineTransferButton from "pages/wallet/components/wallet-tables/buttons/line-transfer-button";
import * as React from "react";
import { useTranslation } from "react-i18next";

import LineDepositButton from "../buttons/line-deposit-button";
import LineWithdrawButton from "../buttons/line-withdraw-button";
import styles from "./wallet-list.module.scss";

const _WalletListButton: React.FC<IWalletListButton> = ({ wallet }) => {
  const {
    currency,
    isWithdrawalEnabled,
    isDepositEnabled,
    depositUrlCoindirect
  } = wallet;
  const [t] = useTranslation();
  return (
    <Row className={styles["wallet-list__buttons"]}>
      {depositUrlCoindirect && (
        <RowItem>
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            render={() => (
              <TooltipContent>
                {t("wallet-page.tooltip.buy-with-card")}
              </TooltipContent>
            )}
          >
            <a
              title={t("wallet-page.list.buy-with-card")}
              href={depositUrlCoindirect}
              target={"_blank"}
              rel="noopener noreferrer"
            >
              {t("wallet-page.list.buy-with-card")}
            </a>
          </Tooltip>
        </RowItem>
      )}
      <LineTransferButton wallet={wallet} />
      <LineWithdrawButton currency={currency} disabled={!isWithdrawalEnabled} />
      <LineDepositButton currency={currency} disabled={!isDepositEnabled} />
    </Row>
  );
};

interface IWalletListButton {
  wallet: WalletData;
}

const WalletListButton = React.memo(_WalletListButton);
export default WalletListButton;
