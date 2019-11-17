import { SignalSubscription } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InvestmentUnauthPopup from "shared/components/details/details-description-section/investment-unauth-popup/investment-unauth-popup";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import FollowModuleContainer from "shared/modules/follow-module/follow-module-container";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { dispatchFollowDescription } from "./services/follow-details.service";

const _FollowButton: React.FC<Props> = ({
  signalSubscription,
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
    dispatch(dispatchFollowDescription(id));
  }, [id]);
  return (
    <>
      <GVButton
        className="asset-details-description__invest-btn"
        onClick={isAuthenticated ? setIsOpenFollow : setIsOpenUnAuth}
      >
        {t("program-details-page.description.follow-trade")}
      </GVButton>
      <FollowModuleContainer
        id={id}
        open={isOpenFollow}
        currency={currency}
        signalSubscription={signalSubscription}
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
  signalSubscription: SignalSubscription;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

const FollowButton = React.memo(_FollowButton);
export default FollowButton;
