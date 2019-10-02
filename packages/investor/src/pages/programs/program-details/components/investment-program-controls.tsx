import { ProgramDetailsFull } from "gv-api-web";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ResolveThunks, connect, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";
import GVButton from "shared/components/gv-button";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";

import NotifyButton from "./notify-button";

const _InvestmentProgramControls: React.FC<Props> = ({
  service: { dispatchProgramDescription },
  programDescription
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [t] = useTranslation();
  const [
    isOpenInvestmentPopup,
    setOpenInvestmentPopup,
    setCloseInvestmentPopup
  ] = useIsOpen();
  const [
    isOpenUnAuthInvestmentPopup,
    setOpenUnAuthInvestmentPopup,
    setCloseUnAuthInvestmentPopup
  ] = useIsOpen();

  const openInvestmentPopup = useCallback(
    () => {
      if (isAuthenticated) setOpenInvestmentPopup();
      else setOpenUnAuthInvestmentPopup();
    },
    [isAuthenticated]
  );

  const notificationId = programDescription.personalProgramDetails
    ? programDescription.personalProgramDetails.notificationAvailableToInvestId
    : undefined;
  const isDisabledInvestButton = isAuthenticated
    ? !programDescription.personalProgramDetails ||
      !programDescription.personalProgramDetails.canInvest
    : false;
  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      <InvestmentProgramInfo programDescription={programDescription} />
      <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
        {programDescription.availableInvestmentBase === 0 && isAuthenticated ? (
          <NotifyButton
            canInvest={programDescription.personalProgramDetails.canInvest}
            currency={programDescription.currency}
            assetId={programDescription.id}
            notificationId={notificationId}
          />
        ) : (
          <GVButton
            className="asset-details-description__invest-btn"
            onClick={openInvestmentPopup}
            disabled={isDisabledInvestButton}
          >
            {t("program-details-page.description.invest")}
          </GVButton>
        )}
      </div>
      <ProgramDeposit
        condition={isAuthenticated}
        currency={programDescription.currency}
        open={isOpenInvestmentPopup}
        id={programDescription.id}
        onClose={setCloseInvestmentPopup}
        onApply={dispatchProgramDescription}
      />
      <InvestmentUnauthPopup
        message={t("program-details-page.description.unauth-popup")}
        asset={ASSET.PROGRAM}
        availableToInvestBase={programDescription.availableInvestmentBase}
        title={programDescription.title}
        currency={programDescription.currency}
        open={isOpenUnAuthInvestmentPopup}
        onClose={setCloseUnAuthInvestmentPopup}
      />
    </DetailsBlock>
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
  programDescription: ProgramDetailsFull;
}

interface Props extends OwnProps, DispatchProps {}

const InvestmentProgramControls = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_InvestmentProgramControls);
export default InvestmentProgramControls;
