import { Button } from "components/button/button";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import React from "react";

import BSCInvestingPopup from "./bsc-investing-popup";

interface Props {
  assetId: string;
}

const _BSCInvestingButton: React.FC<Props> = ({ assetId }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();

  return (
    <>
      <Button size={"xlarge"} onClick={setIsOpen}>
        {t("buttons.invest-bsc")}
      </Button>
      <BSCInvestingPopup id={assetId} open={isOpen} onClose={setIsClose} />
    </>
  );
};

const BSCInvestingButton = React.memo(_BSCInvestingButton);
export default BSCInvestingButton;
