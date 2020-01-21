import "./broker-select.scss";

import Surface from "components/surface/surface";
import { withBlurLoader } from "decorators/with-blur-loader";
import { Broker } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  getAccountTypes,
  getBrokerState,
  getLeverageDescription
} from "../asset.helpers";
import BrokerCard from "./broker-card/broker-card";
import NavigateToSettings from "./navigate-to-settings";

const _BrokerSelectBroker: React.FC<Props> = ({
  data,
  selectedBroker,
  selectBrokerHandle,
  isForexAllowed = true,
  isKycConfirmed = true,
  navigateToSettings
}) => {
  const [t] = useTranslation();
  return (
    <div className="broker-select-container">
      <div className="broker-select">
        <div className="broker-select__list">
          {data.map((broker, i) => (
            <BrokerCard
              logo={broker.logo}
              key={i}
              brokerName={broker.name}
              isSelected={broker === selectedBroker}
              onSelect={selectBrokerHandle}
              cardState={getBrokerState(
                broker.isKycRequired,
                isForexAllowed,
                isKycConfirmed
              )}
              tags={broker.tags}
            />
          ))}
          <div className="broker-select__navigation">
            <NavigateToSettings
              isForex={selectedBroker.isKycRequired}
              isKycConfirmed={isKycConfirmed}
              navigateToSettings={navigateToSettings}
            />
          </div>
        </div>
        <Surface className="surface--horizontal-paddings broker-select__description">
          <h3 className="broker-select__description-heading">
            {selectedBroker.name}
          </h3>
          <div className="broker-select__row">
            <div className="broker-select__info-title">
              {t("create-program-page.broker-info.about")}
            </div>
            <div className="broker-select__info-text">
              {selectedBroker.description}
            </div>
          </div>
          <div className="broker-select__row">
            <div className="broker-select__info-title">
              {t("create-program-page.broker-info.account-type")}
            </div>
            <div className="broker-select__info-text">
              {getAccountTypes(selectedBroker.accountTypes)}
            </div>
          </div>
          <div className="broker-select__row">
            <div className="broker-select__info-title">
              {t("create-program-page.broker-info.trading-platform")}
            </div>
            <div className="broker-select__info-text">
              {selectedBroker.accountTypes[0].type}
            </div>
          </div>
          <div className="broker-select__row">
            <div className="broker-select__info-title">
              {t("create-program-page.broker-info.terms")}
            </div>
            <div className="broker-select__info-text">
              <a
                title={t("create-program-page.broker-info.read-terms")}
                href={selectedBroker.terms}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("create-program-page.broker-info.read-terms")}
              </a>
            </div>
          </div>
          <div className="broker-select__row broker-select__row--small">
            <div className="broker-select__info-title">
              {t("create-program-page.broker-info.leverage")}
            </div>
            <div className="broker-select__info-text">
              {getLeverageDescription(
                selectedBroker.leverageMin,
                selectedBroker.leverageMax
              )}
            </div>
          </div>
          <div className="broker-select__row">
            <div className="broker-select__info-title">
              {t("create-program-page.broker-info.assets")}
            </div>
            <div className="broker-select__info-text">
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
  selectedBroker: Broker;
  selectBrokerHandle: (broker: string) => () => void;
  isForexAllowed?: boolean;
  isKycConfirmed?: boolean;
  navigateToSettings: () => void;
}

const BrokerSelect = withBlurLoader(React.memo(_BrokerSelectBroker));
export default BrokerSelect;
