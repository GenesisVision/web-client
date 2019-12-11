import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import EditFollowModuleContainer from "modules/follow-module/edit-follow-module-container";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _EditFollowButton: React.FC<Props> = ({
  onApply,
  tradingAccountId,
  id,
  currency
}) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const dispatchDescription = useCallback(() => {
    onApply();
  }, [id]);
  return (
    <>
      <GVButton size={GV_BTN_SIZE.BIG} onClick={setIsOpenPopup}>
        {t("buttons.edit")}
      </GVButton>
      <EditFollowModuleContainer
        tradingAccountId={tradingAccountId}
        id={id}
        open={isOpenPopup}
        currency={currency}
        onClose={setIsClosePopup}
        onApply={dispatchDescription}
      />
    </>
  );
};

interface Props {
  onApply: VoidFunction;
  tradingAccountId: string;
  id: string;
  currency: CurrencyEnum;
}

const EditFollowButton = React.memo(_EditFollowButton);
export default EditFollowButton;
