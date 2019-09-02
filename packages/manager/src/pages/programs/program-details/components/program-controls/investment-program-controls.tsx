import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import LevelCalculator from "modules/level-calculator/components/level-calculator";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";

const _InvestmentProgramControls: React.FC<Props> = ({
  isKycConfirmed,
  service: { dispatchProgramDescription },
  t,
  isOwnProgram,
  programDescription,
  isAuthenticated,
  levelsParameters
}) => {
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
    <>
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

const mapStateToProps = (state: RootState): StateProps => ({
  isKycConfirmed: kycConfirmedSelector(state)
});

interface StateProps {
  isKycConfirmed: boolean;
}

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

interface Props extends WithTranslation, OwnProps, DispatchProps, StateProps {}

const InvestmentProgramControls = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate(),
  React.memo
)(_InvestmentProgramControls);
export default InvestmentProgramControls;
