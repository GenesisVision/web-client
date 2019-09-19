import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import LevelCalculator from "modules/level-calculator/components/level-calculator";
import ProgramDeposit from "modules/program-deposit/program-deposit";
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
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";

const _InvestmentProgramControls: React.FC<Props> = ({
  service: { dispatchProgramDescription },
  isOwnProgram,
  programDescription,
  isAuthenticated,
  levelsParameters
}) => {
  const [t] = useTranslation();
  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const [
    isOpenInvestPopup,
    setIsOpenInvestPopup,
    setIsCloseInvestPopup
  ] = useIsOpen();
  const [
    isOpenUnAuthInvestPopup,
    setIsOpenUnAuthInvestPopup,
    setIsCloseUnAuthInvestPopup
  ] = useIsOpen();

  const message =
    isAuthenticated && !isOwnProgram
      ? t("program-details-page.description.auth-manager-popup")
      : t("program-details-page.description.unauth-popup");
  const isDisabledInvestButton = isAuthenticated
    ? !programDescription.personalProgramDetails ||
      !programDescription.personalProgramDetails.canInvest
    : false;

  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="asset-details-description__col"
    >
      <InvestmentProgramInfo
        isOwnProgram={isOwnProgram}
        programDescription={programDescription}
        levelsParameters={levelsParameters}
        isKycConfirmed={isKycConfirmed}
        LevelCalculator={LevelCalculator}
      />
      <div className="program-details-description__statistic-container program-details-description__statistic-container--btn">
        {isOwnProgram ? (
          <GVButton
            className="program-details-description__invest-btn"
            onClick={setIsOpenInvestPopup}
            disabled={isDisabledInvestButton}
          >
            {t("program-details-page.description.invest")}
          </GVButton>
        ) : (
          <GVButton
            className="program-details-description__invest-btn"
            onClick={setIsOpenUnAuthInvestPopup}
          >
            {t("program-details-page.description.invest")}
          </GVButton>
        )}
      </div>
      <InvestmentUnauthPopup
        message={message}
        title={programDescription.title}
        currency={programDescription.currency}
        availableToInvestBase={programDescription.availableInvestment}
        asset={ASSET.PROGRAM}
        open={isOpenUnAuthInvestPopup}
        onClose={setIsCloseUnAuthInvestPopup}
      />
      <ProgramDeposit
        condition={isAuthenticated}
        currency={programDescription.currency}
        open={isOpenInvestPopup}
        id={programDescription.id}
        onClose={setIsCloseInvestPopup}
        onApply={dispatchProgramDescription}
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
  isAuthenticated: boolean;
  canCloseProgram: boolean;
  isOwnProgram: boolean;
  programDescription: ProgramDetailsFull;
  levelsParameters: LevelsParamsInfo;
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
