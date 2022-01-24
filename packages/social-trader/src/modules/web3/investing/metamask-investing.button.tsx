import { Button } from "components/button/button";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import React from "react";
import { CurrencyEnum } from "utils/types";

import MetamaskInvestingPopup from "./metamask-investing-popup";

interface Props {
  assetIndex: number;
  currency: CurrencyEnum;
}

const _MetamaskInvestingButton: React.FC<Props> = ({
  assetIndex,
  currency
}) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();

  return (
    <>
      <Hint
        content={
          <Button size={"xlarge"} onClick={setIsOpen} color={"secondary"}>
            {currency === "BNB"
              ? t("buttons.invest-bsc")
              : t("buttons.invest-xDai")}
          </Button>
        }
        vertical={VERTICAL_POPOVER_POS.TOP}
        tooltipContent={
          currency === "BNB"
            ? t("asset-details:metamask-integration.bnb.tooltip-text")
            : t("asset-details:metamask-integration.xDai.tooltip-text")
        }
      />
      <MetamaskInvestingPopup
        currency={currency}
        index={assetIndex}
        open={isOpen}
        onClose={setIsClose}
      />
    </>
  );
};

const MetamaskInvestingButton = React.memo(_MetamaskInvestingButton);
export default MetamaskInvestingButton;
