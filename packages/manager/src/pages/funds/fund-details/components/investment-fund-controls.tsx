import { FundDetailsFull } from "gv-api-web";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
import GVButton from "shared/components/gv-button";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";

const _InvestmentFundControls: React.FC<Props> = ({
  t,
  service: { dispatchFundDescription },
  isAuthenticated,
  fundDescription
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
  const { personalFundDetails } = fundDescription;
  const isOwnProgram = personalFundDetails && personalFundDetails.isOwnProgram;

  const message =
    isAuthenticated && !isOwnProgram
      ? t("fund-details-page.description.auth-manager-popup")
      : t("fund-details-page.description.unauth-popup");

  const isDisabledInvestButton = isAuthenticated
    ? !personalFundDetails || !personalFundDetails.canInvest
    : false;

  return (
    <>
      <InvestmentFundInfo fundDescription={fundDescription} />
      <div className="details-description__invest-button-container">
        {isOwnProgram ? (
          <>
            <GVButton
              className="details-description__invest-btn"
              onClick={setIsOpenInvestPopup}
              disabled={isDisabledInvestButton}
            >
              {t("fund-details-page.description.invest")}
            </GVButton>
          </>
        ) : (
          <GVButton
            className="details-description__invest-btn"
            onClick={setIsOpenUnAuthInvestPopup}
          >
            {t("fund-details-page.description.invest")}
          </GVButton>
        )}
      </div>
      <FundDepositContainer
        condition={isAuthenticated}
        open={isOpenInvestPopup}
        id={fundDescription.id}
        onClose={setIsCloseInvestPopup}
        onApply={dispatchFundDescription}
      />
      <InvestmentUnauthPopup
        message={message}
        title={fundDescription.title}
        asset={ASSET.FUND}
        open={isOpenUnAuthInvestPopup}
        onClose={setIsCloseUnAuthInvestPopup}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchFundDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchFundDescription: typeof dispatchFundDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  isAuthenticated: boolean;
  fundDescription: FundDetailsFull;
}

interface Props extends WithTranslation, OwnProps, DispatchProps {}

const InvestmentFundControls = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  translate(),
  React.memo
)(_InvestmentFundControls);
export default InvestmentFundControls;
