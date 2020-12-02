import { BrokerCardType } from "components/assets/broker-select/broker-select.types";
import { DefaultBlock } from "components/default.block/default.block";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import { BrokerAccountType } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  getBrokerAccountTypes,
  getBrokerState,
  getExchangeAccountTypes,
  getLeverageDescription
} from "../asset.helpers";
import BrokerCard from "./broker-card/broker-card";
import styles from "./broker-select.module.scss";
import NavigateToSettings from "./navigate-to-settings";

interface Props {
  data: BrokerCardType[];
  selectedBroker: BrokerCardType;
  selectBrokerHandle: (broker: string) => VoidFunction;
  isForexAllowed?: boolean;
  isKycConfirmed?: boolean;
  navigateToSettings: VoidFunction;
}

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
    <Row center={false}>
      <RowItem>
        <Row wrap wide className={styles["broker-select__list"]}>
          {data.map((broker, i) => (
            <RowItem bottomOffset key={i}>
              <BrokerCard
                logo={broker.logoUrl}
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
        </Row>
        <Row className={styles["broker-select__navigation"]}>
          <NavigateToSettings
            isForex={selectedBroker.isKycRequired}
            isKycConfirmed={isKycConfirmed}
            navigateToSettings={navigateToSettings}
          />
        </Row>
      </RowItem>
      <DefaultBlock
        size={"large"}
        solid
        wide
        className={styles["broker-select__description"]}
      >
        <Row>
          <h3>{selectedBroker.name}</h3>
        </Row>
        <Row onlyOffset>
          <Row>
            <LabeledValue label={t("create-account:broker-info.about")}>
              {selectedBroker.description}
            </LabeledValue>
          </Row>
          {selectedBroker.name !== "Genesis Markets" && (
            <Row>
              <LabeledValue
                label={t("create-account:broker-info.account-type")}
              >
                {"leverageMin" in selectedBroker
                  ? getBrokerAccountTypes(
                      selectedBroker.accountTypes as BrokerAccountType[]
                    )
                  : getExchangeAccountTypes(selectedBroker.accountTypes)}
              </LabeledValue>
            </Row>
          )}
          <Row>
            <LabeledValue
              label={t("create-account:broker-info.trading-platform")}
            >
              {selectedBroker.accountTypes[0].type}
            </LabeledValue>
          </Row>
          <Row>
            <LabeledValue label={t("create-account:broker-info.terms")}>
              <a
                title={t("create-account:broker-info.read-terms")}
                href={selectedBroker.terms}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("create-account:broker-info.read-terms")}
              </a>
            </LabeledValue>
          </Row>
          {"leverageMin" in selectedBroker && (
            <Row>
              <LabeledValue label={t("create-account:broker-info.leverage")}>
                {getLeverageDescription(
                  selectedBroker.leverageMin,
                  selectedBroker.leverageMax
                )}
              </LabeledValue>
            </Row>
          )}
          <Row>
            <LabeledValue label={t("create-account:broker-info.assets")}>
              {selectedBroker.assets}
            </LabeledValue>
          </Row>
        </Row>
      </DefaultBlock>
    </Row>
  );
};

const BrokerSelect = withBlurLoader(React.memo(_BrokerSelectBroker));
export default BrokerSelect;
