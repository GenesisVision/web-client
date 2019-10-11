import "./subscription-details.scss";

import { PersonalProgramDetailsFull } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { connect, ResolveThunks } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from "redux";
import useIsOpen from "shared/hooks/is-open.hook";
import { fetchRate } from "shared/services/rate-service";
import { CurrencyEnum } from "shared/utils/types";

import { dispatchProgramDescription } from "../../services/program-details.service";
import SubscriptionDetails from "./subscription-details";
import ProgramFollowContainer from "shared/modules/program-follow/program-follow-container";

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
  }, []);
  return (
    <>
      <SubscriptionDetails
        currency={currency}
        personalDetails={personalDetails}
        openPopup={setOpenPopup}
        rate={rate}
      />
      <ProgramFollowContainer
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
  personalDetails: PersonalProgramDetailsFull;
}

const SubscriptionDetailsContainer = connect(
  null,
  mapDispatchToProps
)(React.memo(_SubscriptionDetailsContainer));
export default SubscriptionDetailsContainer;
