import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { AssetGuestActions, BrokerTradeServerType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import FollowModuleContainer from "modules/follow-module/follow-module-container";
import { dispatchFollowDescription } from "pages/follows/follow-details/services/follow-details.service";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CurrencyEnum } from "utils/types";

const _FollowButton: React.FC<Props> = ({
  guestActions: {
    canSubscribeToExternalSignalCommonAccount,
    canSubscribeToExternalSignalPrivateAccount,
    canSubscribeToInternalSignal
  } = {},
  onApply,
  leverage,
  brokerId,
  isExternal,
  broker,
  id,
  currency
}) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const [isOpenFollow, setIsOpenFollow, setIsCloseFollow] = useIsOpen();
  const dispatchDescription = useCallback(() => {
    dispatch(dispatchFollowDescription(id)());
    onApply && onApply();
  }, [id]);
  const canFollow =
    canSubscribeToExternalSignalCommonAccount ||
    canSubscribeToExternalSignalPrivateAccount ||
    canSubscribeToInternalSignal;
  return (
    <>
      <GVButton
        disabled={!canFollow}
        size={GV_BTN_SIZE.BIG}
        onClick={setIsOpenFollow}
      >
        {t("program-details-page.description.follow-trade")}
      </GVButton>
      <FollowModuleContainer
        leverage={leverage}
        isExternal={isExternal}
        brokerId={brokerId}
        broker={broker}
        id={id}
        open={isOpenFollow}
        currency={currency}
        onClose={setIsCloseFollow}
        onApply={dispatchDescription}
      />
    </>
  );
};

interface Props {
  guestActions?: AssetGuestActions;
  onApply?: VoidFunction;
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  id: string;
  currency?: CurrencyEnum;
}

const FollowButton = React.memo(_FollowButton);
export default FollowButton;
