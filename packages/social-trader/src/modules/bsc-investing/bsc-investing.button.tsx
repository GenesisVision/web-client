import { Button } from "components/button/button";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import React from "react";

import BSCInvestingPopup from "./bsc-investing-popup";

interface Props {
  assetIndex: number;
}

const _BSCInvestingButton: React.FC<Props> = ({ assetIndex }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();

  return (
    <>
      <Hint
        content={
          <Button size={"xlarge"} onClick={setIsOpen} color={"secondary"}>
            {t("buttons.invest-bsc")}
          </Button>
        }
        vertical={VERTICAL_POPOVER_POS.TOP}
        tooltipContent={t("asset-details:bsc-integration.tooltip-text")}
      />
      <BSCInvestingPopup
        index={assetIndex}
        open={isOpen}
        onClose={setIsClose}
      />
    </>
  );
};

const BSCInvestingButton = React.memo(_BSCInvestingButton);
export default BSCInvestingButton;
