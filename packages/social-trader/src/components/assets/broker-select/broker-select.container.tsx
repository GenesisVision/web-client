import { BrokerSelectLoaderData } from "components/assets/asset.helpers";
import Crashable from "decorators/crashable";
import { Broker } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  forexAllowedSelector,
  kycConfirmedSelector
} from "reducers/header-reducer";
import { safeGetElemFromArray } from "utils/helpers";

import BrokerSelect from "./broker-select";

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

interface Props {
  brokers: Broker[];
  navigateToSettings: () => void;
  setSelectedBroker: (broker: Broker) => void;
  selectedBroker: Broker;
}

const BrokerSelectContainer = React.memo(
  Crashable(_BrokerSelectBrokerContainer)
);
export default BrokerSelectContainer;
