import "./subscription-details.scss";

import { PersonalProgramDetailsFull } from "gv-api-web";
import ProgramFollowContainer from "investor-web-portal/src/modules/program-follow/program-follow-container";
import React, { useCallback, useEffect, useState } from "react";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import useIsOpen from "shared/hooks/is-open.hook";
import { rateApi } from "shared/services/api-client/rate-api";
import { CurrencyEnum } from "shared/utils/types";

import SubscriptionDetails from "./subscription-details";

const _SubscriptionDetailsContainer: React.FC<Props> = ({
  id,
  currency,
  personalDetails
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [rate, setRate] = useState<number>(0);
  useEffect(() => {
    rateApi
      .v10RateByFromByToGet("USD", currency)
      .then(rate => setRate(rate))
      .catch(() => setRate(0));
  }, []);
  const applyChanges = useCallback(
    (updateDescription: any) => () => updateDescription(),
    []
  );
  return (
    <ProgramDetailContext.Consumer>
      {({ updateDescription }: IProgramDetailContext) => (
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
            onApply={applyChanges(updateDescription)}
          />
        </>
      )}
    </ProgramDetailContext.Consumer>
  );
};

interface Props {
  id: string;
  currency: CurrencyEnum;
  personalDetails: PersonalProgramDetailsFull;
}

const SubscriptionDetailsContainer = React.memo(_SubscriptionDetailsContainer);
export default SubscriptionDetailsContainer;
