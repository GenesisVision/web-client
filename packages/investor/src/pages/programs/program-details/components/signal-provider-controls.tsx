import { ProgramDetailsFull } from "gv-api-web";
import ProgramFollowContainer from "modules/program-follow/program-follow-container";
import ProgramUnfollowContainer from "modules/program-unfollow/program-unfollow-container";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";

const _SignalProviderControls: React.FC<Props> = ({
  programDescription,
  isAuthenticated,
  service: { dispatchProgramDescription }
}) => {
  const [t] = useTranslation();
  const [isOpenFollow, setIsOpenFollow, setIsCloseFollow] = useIsOpen();
  const [isOpenUnFollow, setIsOpenUnFollow, setIsCloseUnFollow] = useIsOpen();
  const [isOpenUnAuth, setIsOpenUnAuth, setIsCloseUnAuth] = useIsOpen();
  return (
    <>
      <SignalProgramInfo programDescription={programDescription} />
      <div className="program-details-description__statistic-container program-details-description__statistic-container--btn">
        {programDescription.personalProgramDetails &&
        programDescription.personalProgramDetails.signalSubscription
          .hasActiveSubscription ? (
          <>
            <GVButton
              color="secondary"
              variant="outlined"
              className="program-details-description__invest-btn"
              onClick={setIsOpenUnFollow}
            >
              {t("program-details-page.description.unfollow")}
            </GVButton>
          </>
        ) : (
          <GVButton
            className="program-details-description__invest-btn"
            onClick={isAuthenticated ? setIsOpenFollow : setIsOpenUnAuth}
          >
            {t("program-details-page.description.follow-trade")}
          </GVButton>
        )}
      </div>
      {programDescription.personalProgramDetails && (
        <>
          <ProgramFollowContainer
            id={programDescription.id}
            open={isOpenFollow}
            currency={programDescription.currency}
            signalSubscription={
              programDescription.personalProgramDetails.signalSubscription
            }
            onClose={setIsCloseFollow}
            onApply={dispatchProgramDescription}
          />
          <ProgramUnfollowContainer
            open={isOpenUnFollow}
            id={programDescription.id}
            onClose={setIsCloseUnFollow}
            onApply={dispatchProgramDescription}
          />
        </>
      )}
      <InvestmentUnauthPopup
        header={t("program-details-page.description.follow-trade")}
        message={t("program-details-page.description.unauth-follow-popup")}
        asset={ASSET.PROGRAM}
        title={programDescription.title}
        currency={programDescription.currency}
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
  isAuthenticated: boolean;
  programDescription: ProgramDetailsFull;
}

interface Props extends OwnProps, DispatchProps {}

const SignalProviderControls = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  )
)(_SignalProviderControls);
export default SignalProviderControls;
