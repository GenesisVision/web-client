import { SignalSubscription } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import GVButton from "shared/components/gv-button";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import ProgramFollowContainer from "shared/modules/program-follow/program-follow-container";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { CurrencyEnum } from "shared/utils/types";

const _FollowButton: React.FC<Props> = ({
  signalSubscription,
  id,
  title,
  currency,
  service: { dispatchProgramDescription }
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [t] = useTranslation();
  const [isOpenFollow, setIsOpenFollow, setIsCloseFollow] = useIsOpen();
  const [isOpenUnAuth, setIsOpenUnAuth, setIsCloseUnAuth] = useIsOpen();
  return (
    <>
      <GVButton
        className="asset-details-description__invest-btn"
        onClick={isAuthenticated ? setIsOpenFollow : setIsOpenUnAuth}
      >
        {t("program-details-page.description.follow-trade")}
      </GVButton>
      <ProgramFollowContainer
        id={id}
        open={isOpenFollow}
        currency={currency}
        signalSubscription={signalSubscription}
        onClose={setIsCloseFollow}
        onApply={dispatchProgramDescription}
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  signalSubscription: SignalSubscription;
  id: string;
  title: string;
  currency: CurrencyEnum;
}

interface Props extends OwnProps, DispatchProps {}

const FollowButton = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_FollowButton);
export default FollowButton;
