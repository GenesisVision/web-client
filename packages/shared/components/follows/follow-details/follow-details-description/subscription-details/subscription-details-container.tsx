import "./subscription-details.scss";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useIsOpen from "shared/hooks/is-open.hook";
import FollowModuleContainer from "shared/modules/follow-module/follow-module-container";
import { fetchRate } from "shared/services/rate-service";
import { CurrencyEnum } from "shared/utils/types";

import { dispatchFollowDescription } from "../../services/follow-details.service";
import SubscriptionDetails from "./subscription-details";

const _SubscriptionDetailsContainer: React.FC<Props> = ({
  id,
  currency,
  personalDetails
}) => {
  const dispatch = useDispatch();
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
        onApply={() => dispatch(dispatchFollowDescription(id)())}
      />
    </>
  );
};

interface Props {
  id: string;
  currency: CurrencyEnum;
  personalDetails: any;
}

const SubscriptionDetailsContainer = React.memo(_SubscriptionDetailsContainer);
export default SubscriptionDetailsContainer;
