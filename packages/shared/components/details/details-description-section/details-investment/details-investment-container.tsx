import "./details-investment.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResolveThunks, connect, useDispatch, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import {
  EVENT_LOCATION,
  getEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { TableSelectorType } from "shared/components/table/components/table.types";
import { ASSET } from "shared/constants/constants";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum, DispatchDescriptionType } from "shared/utils/types";

import DetailsInvestment from "./details-investment";
import { InvestmentDetails } from "./details-investment.helpers";
import { haveActiveInvestment, haveSubscription } from "./investment-container";

const _DetailsInvestmentContainer: React.FC<Props> = ({
  asset,
  eventTypesSelector,
  selector,
  currency,
  service: { dispatchDescription },
  id,
  personalDetails,
  WithdrawContainer,
  ProgramReinvestingWidget
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const events = useSelector(selector);
  const eventTypeFilterValues = useSelector(eventTypesSelector);
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(
    () => {
      isAuthenticated && dispatch(getEvents(id, EVENT_LOCATION.Asset)());
    },
    [isAuthenticated]
  );
  useEffect(
    () => {
      isAuthenticated && setHaveEvents(events.itemsData.data.total > 0);
    },
    [isAuthenticated, events]
  );
  const haveInvestment =
    haveActiveInvestment(personalDetails) || haveSubscription(personalDetails);
  const showInvestment = haveEvents || haveInvestment;
  return (
    <DetailsInvestment
      condition={showInvestment}
      selector={selector}
      haveEvents={haveEvents}
      haveInvestment={haveInvestment}
      eventTypeFilterValues={eventTypeFilterValues}
      updateDescription={dispatchDescription}
      notice={t("program-details-page.description.withdraw-notice-text")}
      asset={asset}
      id={id}
      assetCurrency={currency}
      personalDetails={personalDetails}
      ProgramReinvestingWidget={ProgramReinvestingWidget}
      WithdrawContainer={WithdrawContainer}
    />
  );
};

interface OwnProps {
  asset: ASSET;
  eventTypesSelector: (state: RootState) => SelectFilterValue[];
  dispatchDescription: DispatchDescriptionType;
  selector: TableSelectorType;
  currency: CurrencyEnum;
  id: string;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { dispatchDescription }: Props
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchDescription: DispatchDescriptionType;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps, OwnProps {}

const DetailsInvestmentContainer = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DetailsInvestmentContainer);
export default DetailsInvestmentContainer;
