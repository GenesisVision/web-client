import "./subscription-details.scss";

import { PersonalProgramDetails } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { connect, ResolveThunks } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from "redux";
import useIsOpen from "shared/hooks/is-open.hook";
import FollowModuleContainer from "shared/modules/follow-module/follow-module-container";
import { fetchRate } from "shared/services/rate-service";
import { CurrencyEnum } from "shared/utils/types";

import { dispatchProgramDescription } from "../../services/program-details.service";
import SubscriptionDetails from "./subscription-details";

const _SubscriptionDetailsContainer: React.FC<Props> = ({
  service: { dispatchProgramDescription },
  id,
  currency,
  personalDetails
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [rate, setRate] = useState<number>(1);
  useEffect(() => {
    fetchRate("USD", currency)
      .then(setRate)
      .catch(() => setRate(1));
  }, [currency]);
  return (
    <>
      <SubscriptionDetails
        currency={currency}
        personalDetails={personalDetails}
        openPopup={setOpenPopup}
        rate={rate}
      />
      <FollowModuleContainer
        id={id}
        open={isOpenPopup}
        currency={currency}
        signalSubscription={personalDetails.signalSubscription}
        onClose={setClosePopup}
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

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps {
  id: string;
  currency: CurrencyEnum;
  personalDetails: PersonalProgramDetails;
}

const SubscriptionDetailsContainer = connect(
  null,
  mapDispatchToProps
)(React.memo(_SubscriptionDetailsContainer));
export default SubscriptionDetailsContainer;
