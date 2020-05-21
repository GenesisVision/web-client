import { BrokerSelectLoaderData } from "components/assets/asset.helpers";
import { BrokerCardType } from "components/assets/broker-select/broker-select.types";
import Crashable from "decorators/crashable";
import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  forexAllowedSelector,
  kycConfirmedSelector
} from "reducers/header-reducer";
import { safeGetElemFromArray } from "utils/helpers";

import BrokerSelect from "./broker-select";

interface Props {
  brokers: BrokerCardType[];
  navigateToSettings: () => void;
  setSelectedBroker: (broker: BrokerCardType) => void;
  selectedBroker: BrokerCardType;
}

const _BrokerSelectBrokerContainer: React.FC<Props> = ({
  brokers,
  setSelectedBroker,
  selectedBroker,
  navigateToSettings
}) => {
  const isForexAllowed = useSelector(forexAllowedSelector);
  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const selectBrokerHandle = useCallback(
    (brokerName: string) => () => {
      const selectedBroker = safeGetElemFromArray(
        brokers!,
        ({ name }) => name === brokerName
      );
      setSelectedBroker(selectedBroker);
    },
    [brokers]
  );
  return (
    <BrokerSelect
      loaderData={BrokerSelectLoaderData}
      data={brokers!}
      selectedBroker={selectedBroker}
      selectBrokerHandle={selectBrokerHandle}
      isForexAllowed={isForexAllowed}
      isKycConfirmed={isKycConfirmed}
      navigateToSettings={navigateToSettings}
    />
  );
};

const BrokerSelectContainer = React.memo(
  Crashable(_BrokerSelectBrokerContainer)
);
export default BrokerSelectContainer;
