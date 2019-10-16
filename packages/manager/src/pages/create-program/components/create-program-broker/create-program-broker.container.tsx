import "./create-program-broker.scss";

import { Broker } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  forexAllowedSelector,
  kycConfirmedSelector
} from "shared/reducers/header-reducer";

import {
  CreateProgramBrokerLoaderData,
  fetchBrokers
} from "../../services/create-program.service";
import CreateProgramBroker from "./create-program-broker";

const _CreateProgramBrokerContainer: React.FC<Props> = ({
  setSelectedBroker,
  selectedBroker,
  navigateToSettings
}) => {
  const [brokers, setBrokers] = useState<Broker[] | undefined>(undefined);
  useEffect(
    () => {
      fetchBrokers().then(brokers => {
        setBrokers(brokers);
        setSelectedBroker(brokers[0]);
      });
    },
    [setSelectedBroker]
  );
  const isForexAllowed = useSelector(forexAllowedSelector);
  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const selectBrokerHandle = useCallback(
    (brokerName: string) => () => {
      const selectedBroker = brokers!.find(({ name }) => name === brokerName)!;
      setSelectedBroker(selectedBroker);
    },
    [brokers, setSelectedBroker]
  );
  return (
    <CreateProgramBroker
      loaderData={CreateProgramBrokerLoaderData}
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
  navigateToSettings: () => void;
  setSelectedBroker: (broker: Broker) => void;
  selectedBroker?: Broker;
}

const CreateProgramBrokerContainer = React.memo(_CreateProgramBrokerContainer);
export default CreateProgramBrokerContainer;
