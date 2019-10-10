import "./create-program-broker.scss";

import { Broker } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Surface from "shared/components/surface/surface";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import {
  getAccountTypes,
  getBrokerState,
  getLeverageDescription
} from "../create-program-settings/create-program-settings.helpers";
import BrokerCard from "./broker-card/broker-card";
import NavigateToSettings from "./navigate-to-settings";

const _CreateProgramBroker: React.FC<Props> = ({
  data,
  selectedBroker = data[0],
  selectBrokerHandle,
  isForexAllowed = true,
  isKycConfirmed = true,
  navigateToSettings
}) => {
  const [t] = useTranslation();
  return (
    <div className="create-program-broker-container">
      <div className="create-program-broker">
        <div className="create-program-broker__list">
          {data.map((broker, i) => (
            <BrokerCard
              logo={broker.logo}
              key={i}
              brokerName={broker.name}
              isSelected={broker === selectedBroker}
              onSelect={selectBrokerHandle}
              cardState={getBrokerState(false, isForexAllowed, isKycConfirmed)}
              tags={broker.tags}
            />
          ))}
          <div className="create-program-broker__navigation">
            <NavigateToSettings
              isForex={false}
              isKycConfirmed={isKycConfirmed}
              navigateToSettings={navigateToSettings}
            />
          </div>
        </div>
        <Surface className="surface--horizontal-paddings create-program-broker__description">
          <h3 className="create-program-broker__description-heading">
            {selectedBroker.name}
          </h3>
          <div className="create-program-broker__row">
            <div className="create-program-broker__info-title">
              {t("manager.create-program-page.broker-info.about")}
            </div>
            <div className="create-program-broker__info-text">
              {selectedBroker.description}
            </div>
          </div>
          <div className="create-program-broker__row">
            <div className="create-program-broker__info-title">
              {t("manager.create-program-page.broker-info.account-type")}
            </div>
            <div className="create-program-broker__info-text">
              {getAccountTypes(selectedBroker.accountTypes)}
            </div>
          </div>
          <div className="create-program-broker__row">
            <div className="create-program-broker__info-title">
              {t("manager.create-program-page.broker-info.trading-platform")}
            </div>
            <div className="create-program-broker__info-text">
              {selectedBroker.accountTypes[0].type}
            </div>
          </div>
          <div className="create-program-broker__row">
            <div className="create-program-broker__info-title">
              {t("manager.create-program-page.broker-info.terms")}
            </div>
            <div className="create-program-broker__info-text">
              <a
                href={selectedBroker.terms}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("manager.create-program-page.broker-info.read-terms")}
              </a>
            </div>
          </div>
          <div className="create-program-broker__row create-program-broker__row--small">
            <div className="create-program-broker__info-title">
              {t("manager.create-program-page.broker-info.leverage")}
            </div>
            <div className="create-program-broker__info-text">
              {getLeverageDescription(
                selectedBroker.leverageMin,
                selectedBroker.leverageMax
              )}
            </div>
          </div>
          <div className="create-program-broker__row">
            <div className="create-program-broker__info-title">
              {t("manager.create-program-page.broker-info.assets")}
            </div>
            <div className="create-program-broker__info-text">
              {selectedBroker.assets}
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
};

interface Props {
  data: Broker[];
  selectedBroker?: Broker;
  selectBrokerHandle: (broker: string) => () => void;
  isForexAllowed?: boolean;
  isKycConfirmed?: boolean;
  navigateToSettings: () => void;
}

const CreateProgramBroker = withBlurLoader(React.memo(_CreateProgramBroker));
export default CreateProgramBroker;
