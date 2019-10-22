import { FundDetailsFull } from "gv-api-web";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";
import { InvestButtons } from "shared/components/details/details-description-section/details-investment/invest-buttons";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
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
      className="details-description__control-elements-block"
    >
      <InvestmentFundInfo fundDescription={fundDescription} />
      <InvestButtons
        isDisabledInvestButton={isDisabledInvestButton}
        setIsOpenInvestPopup={openPopup}
      />
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
