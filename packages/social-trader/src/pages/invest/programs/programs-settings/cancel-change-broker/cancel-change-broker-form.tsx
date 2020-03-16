import { BROKER_CARD_EXTRA_STATE } from "components/assets/asset.constants";
import BrokerCard from "components/assets/broker-select/broker-card/broker-card";
import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  BrokerAccountType,
  BrokersProgramInfo,
  MigrationRequest
} from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { HuobiWarning } from "pages/invest/programs/programs-settings/change-broker/change-broker-form.helpers";
import React from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";

import ConfirmCancelChangeBroker from "./confirm-cancel-change-broker";

const _CancelChangeBrokerForm: React.FC<Props> = ({
  errorMessage,
  isSignalProgram,
  onSubmit,
  data: { brokers, currentAccountTypeId },
  leverage,
  migration: { newBroker: brokerTo, newLeverage }
}) => {
  const [t] = useTranslation();
  const [
    isCancelChangeBrokerOpen,
    setCancelChangeBrokerOpen,
    setCancelChangeBrokerClose
  ] = useIsOpen();
  const brokerFrom = safeGetElemFromArray(
    brokers,
    broker =>
      !!safeGetElemFromArray(
        broker.accountTypes,
        accountType => accountType.id === currentAccountTypeId
      )
  );
  return (
    <div>
      <Row wrap center={false}>
        <RowItem className="program-settings__broker-info">
          <div className="program-settings__broker">
            <BrokerCard
              logo={brokerFrom.logo}
              key={brokerFrom.name}
              brokerName={brokerFrom.name}
              cardState={BROKER_CARD_EXTRA_STATE.NONE}
              tags={brokerFrom.tags}
            />
          </div>
          <StatisticItem
            label={t("create-program-page.settings.fields.account-type")}
          >
            {
              safeGetElemFromArray(
                brokerFrom.accountTypes,
                (account: BrokerAccountType) =>
                  account.id === currentAccountTypeId
              ).name
            }
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.settings.fields.brokers-leverage")}
          >
            {leverage}
          </StatisticItem>
        </RowItem>
        <RowItem className="broker-card__next-arrow">&rarr;</RowItem>
        <RowItem className="program-settings__broker-info">
          <div className="program-settings__broker">
            <BrokerCard
              logo={brokerTo.logo}
              key={brokerTo.name}
              brokerName={brokerTo.name}
              cardState={BROKER_CARD_EXTRA_STATE.NONE}
              tags={brokerTo.tags}
            />
          </div>
          <StatisticItem
            label={t("create-program-page.settings.fields.account-type")}
          >
            {brokerTo.accountTypes[0].name}
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.settings.fields.brokers-leverage")}
          >
            {newLeverage}
          </StatisticItem>
        </RowItem>
      </Row>
      <HuobiWarning
        from={brokerFrom.name}
        to={brokerTo.name}
        isSignalProgram={isSignalProgram}
      />
      <FormTextField topPadding>
        {t("program-settings.broker.text-cancel", {
          brokerFrom: brokerFrom.name,
          brokerTo: brokerTo.name
        })}
      </FormTextField>
      <GVButton
        color="primary"
        className="invest-form__submit-button"
        onClick={setCancelChangeBrokerOpen}
      >
        {t("program-settings.buttons.cancel-broker")}
      </GVButton>
      <ConfirmCancelChangeBroker
        errorMessage={errorMessage}
        open={isCancelChangeBrokerOpen}
        onClose={setCancelChangeBrokerClose}
        onApply={onSubmit}
        brokerFrom={brokerFrom.name}
        brokerTo={brokerTo.name}
      />
    </div>
  );
};

interface Props extends CancelChangeBrokerFormOwnProps {}

export interface CancelChangeBrokerFormOwnProps {
  errorMessage?: string;
  data: BrokersProgramInfo;
  isSignalProgram: boolean;
  onSubmit: () => Promise<void>;
  leverage: number;
  migration: MigrationRequest;
}

const CancelChangeBrokerForm = withBlurLoader(
  React.memo(_CancelChangeBrokerForm)
);
export default CancelChangeBrokerForm;
