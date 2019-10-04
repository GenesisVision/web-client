import "./create-program-broker.scss";

import { Broker } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  forexAllowedSelector,
  kycConfirmedSelector
} from "shared/reducers/header-reducer";

import { CreateProgramBrokerLoaderData } from "../../services/create-program.service";
import CreateProgramBroker from "./create-program-broker";

const _CreateProgramBrokerContainer: React.FC<Props> = ({
  brokers,
  setSelectedBroker,
  selectedBroker,
  navigateToSettings
}) => {
  const isForexAllowed = useSelector(forexAllowedSelector);
  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const selectBrokerHandle = useCallback(
    (brokerName: string) => () => {
      const selectedBroker = brokers!.find(({ name }) => name === brokerName)!;
      setSelectedBroker(selectedBroker);
    },
    [brokers]
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
  brokers: Broker[];
  navigateToSettings: () => void;
  setSelectedBroker: (broker: Broker) => void;
  selectedBroker?: Broker;
}

const CreateProgramBrokerContainer = React.memo(_CreateProgramBrokerContainer);
export default CreateProgramBrokerContainer;
