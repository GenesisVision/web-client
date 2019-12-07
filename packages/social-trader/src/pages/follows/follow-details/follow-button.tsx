import InvestmentUnauthPopup from "components/details/details-description-section/investment-unauth-popup/investment-unauth-popup";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { BrokerTradeServerType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import FollowModuleContainer from "modules/follow-module/follow-module-container";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

import { dispatchFollowDescription } from "./services/follow-details.service";

const _FollowButton: React.FC<Props> = ({
  leverage,
  brokerId,
  isExternal,
  broker,
  hasSignalAccount,
  id,
  title,
  currency
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [t] = useTranslation();
  const [isOpenFollow, setIsOpenFollow, setIsCloseFollow] = useIsOpen();
  const [isOpenUnAuth, setIsOpenUnAuth, setIsCloseUnAuth] = useIsOpen();
  const dispatchDescription = useCallback(() => {
    dispatch(dispatchFollowDescription(id)());
  }, [id]);
  return (
    <>
      <GVButton
        size={GV_BTN_SIZE.BIG}
        onClick={isAuthenticated ? setIsOpenFollow : setIsOpenUnAuth}
      >
        {t("program-details-page.description.follow-trade")}
      </GVButton>
      <FollowModuleContainer
        hasSignalAccount={hasSignalAccount}
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
      <InvestmentUnauthPopup
        header={t("program-details-page.description.follow-trade")}
        message={t("program-details-page.description.unauth-follow-popup")}
        asset={ASSET.PROGRAM}
        title={title}
        currency={currency}
        open={isOpenUnAuth}
        onClose={setIsCloseUnAuth}
      />
    </>
  );
};

interface Props {
  hasSignalAccount: boolean;
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const FollowButton = React.memo(_FollowButton);
export default FollowButton;
