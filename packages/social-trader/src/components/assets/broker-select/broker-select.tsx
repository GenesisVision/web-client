import "./broker-select.scss";

import { RowItem } from "components/row-item/row-item";
import StatisticItem from "components/statistic-item/statistic-item";
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
            <RowItem bottomOffset key={i}>
              <BrokerCard
                logo={broker.logo}
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
            </RowItem>
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
          <h3>{selectedBroker.name}</h3>
          <StatisticItem label={t("create-program-page.broker-info.about")}>
            {selectedBroker.description}
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.broker-info.account-type")}
          >
            {getAccountTypes(selectedBroker.accountTypes)}
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.broker-info.trading-platform")}
          >
            {selectedBroker.accountTypes[0].type}
          </StatisticItem>
          <StatisticItem label={t("create-program-page.broker-info.terms")}>
            <a
              title={t("create-program-page.broker-info.read-terms")}
              href={selectedBroker.terms}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("create-program-page.broker-info.read-terms")}
            </a>
          </StatisticItem>
          <StatisticItem label={t("create-program-page.broker-info.leverage")}>
            {getLeverageDescription(
              selectedBroker.leverageMin,
              selectedBroker.leverageMax
            )}
          </StatisticItem>
          <StatisticItem label={t("create-program-page.broker-info.assets")}>
            {selectedBroker.assets}
          </StatisticItem>
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
