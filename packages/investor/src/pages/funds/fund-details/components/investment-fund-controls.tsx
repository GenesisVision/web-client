import { FundDetailsFull } from "gv-api-web";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
import GVButton from "shared/components/gv-button";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";

const _InvestmentFundControls: React.FC<Props> = ({
  fundDescription,
  isAuthenticated,
  service: { dispatchFundDescription }
}) => {
  const [t] = useTranslation();
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

  const isDisabledInvestButton = isAuthenticated
    ? !fundDescription.personalFundDetails ||
      !fundDescription.personalFundDetails.canInvest
    : false;

  const openPopup = isAuthenticated
    ? setIsOpenInvestPopup
    : setIsOpenUnAuthInvestPopup;

  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="asset-details-description__col asset-details-description__col--fund"
    >
      <InvestmentFundInfo fundDescription={fundDescription} />
      <div className="details-description__invest-button-container">
        <GVButton
          className="details-description__invest-btn"
          onClick={openPopup}
          disabled={isDisabledInvestButton}
        >
          {t("fund-details-page.description.invest")}
        </GVButton>
      </div>
      <FundDepositContainer
        condition={isAuthenticated}
        open={isOpenInvestPopup}
        id={fundDescription.id}
        onClose={setIsCloseInvestPopup}
        onApply={dispatchFundDescription}
      />
      <InvestmentUnauthPopup
        message={t("fund-details-page.description.unauth-popup")}
        title={fundDescription.title}
        asset={ASSET.FUND}
        open={isOpenUnAuthInvestPopup}
        onClose={setIsCloseUnAuthInvestPopup}
      />
    </DetailsBlock>
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

interface Props extends OwnProps, DispatchProps {}

const InvestmentFundControls = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  )
)(_InvestmentFundControls);
export default InvestmentFundControls;
