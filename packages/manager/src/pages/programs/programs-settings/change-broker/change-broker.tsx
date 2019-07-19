import { FormikProps, withFormik } from "formik";
import { Broker, BrokerAccountType } from "gv-api-web";
import BrokerCard from "pages/create-program/components/create-program-broker/broker-card/broker-card";
import { BROKER_CARD_EXTRA_STATE } from "pages/create-program/components/create-program-broker/broker-card/broker-card.constants";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import useIsOpen from "shared/hooks/is-open.hook";
import { SetSubmittingType } from "shared/utils/types";

import ConfirmChangeBroker from "./confirm-change-broker";

const _ChangeBroker: React.FC<Props> = ({
  onSubmit,
  submitForm,
  currentAccountTypeId,
  handleSubmit,
  values,
  dirty,
  isValid,
  isSubmitting,
  setFieldValue,
  t,
  id,
  brokers
}) => {
  const [
    isChangeBrokerOpen,
    setChangeBrokerOpen,
    setChangeBrokerClose
  ] = useIsOpen();
  const [selectedBroker, setSelectedBroker] = useState<Broker>(
    brokers.find(
      broker =>
        !!broker.accountTypes.find(
          accountType => accountType.id === currentAccountTypeId
        )
    )!
  );
  const [account, setAccount] = useState<BrokerAccountType>(
    selectedBroker.accountTypes.find(acc => acc.id === currentAccountTypeId)!
  );
  const selectBroker = useCallback(
    (brokerName: string) => () => {
      const broker = brokers.find(x => x.name === brokerName)!;
      const firstAccount = broker.accountTypes[0];
      setSelectedBroker(broker);
      setAccount(firstAccount);
      setFieldValue(FIELDS.brokerAccountTypeId, firstAccount.id);
      setFieldValue(FIELDS.leverage, firstAccount.leverages[0]);
    },
    [brokers]
  );
  const changeAccount = useCallback(
    ({ target }) => {
      setAccount(
        selectedBroker.accountTypes.find(
          account => account.id === target.value
        )!
      );
    },
    [selectedBroker]
  );
  const { brokerAccountTypeId, brokerFrom } = values;
  return (
    <form id="change-broker-form" onSubmit={handleSubmit}>
      <h3>{t("manager.program-settings.broker.title")}</h3>
      <div className="program-edit__block-wrapper program-edit__block-wrapper--broker-list">
        {brokers.map(broker => (
          <BrokerCard
            logo={broker.logo}
            key={broker.name}
            brokerName={broker.name}
            isSelected={broker.name === selectedBroker.name}
            onSelect={selectBroker}
            cardState={BROKER_CARD_EXTRA_STATE.NONE}
            tags={broker.tags}
          />
        ))}
      </div>
      <div className="gv-text-field__wrapper">
        <GVFormikField
          name={FIELDS.brokerAccountTypeId}
          component={GVTextField}
          label={t("manager.create-program-page.settings.fields.account-type")}
          InputComponent={Select}
          disableIfSingle
          onChange={changeAccount}
        >
          {selectedBroker.accountTypes.map(account => (
            <option value={account.id} key={account.id}>
              {account.name}
            </option>
          ))}
        </GVFormikField>
      </div>
      <div className="gv-text-field__wrapper">
        <GVFormikField
          disabled={currentAccountTypeId === values[FIELDS.brokerAccountTypeId]}
          name={FIELDS.leverage}
          component={GVTextField}
          label={t(
            "manager.create-program-page.settings.fields.brokers-leverage"
          )}
          InputComponent={Select}
          disableIfSingle
          className="create-program-settings__leverage"
        >
          {account.leverages.map(leverage => (
            <option value={leverage} key={leverage}>
              {leverage}
            </option>
          ))}
        </GVFormikField>
      </div>
      <p className="program-edit__text program-edit__text--color-accent program-edit__text--padding-top">
        {t("manager.program-settings.broker.text-change")}
      </p>
      <GVButton
        onClick={setChangeBrokerOpen}
        color="primary"
        className="invest-form__submit-button"
        disabled={
          !dirty ||
          currentAccountTypeId === values[FIELDS.brokerAccountTypeId] ||
          isSubmitting
        }
      >
        {t("manager.program-settings.buttons.change-broker")}
      </GVButton>
      <ConfirmChangeBroker
        open={isChangeBrokerOpen}
        onClose={setChangeBrokerClose}
        onApply={()=>{}}
        brokerFrom={brokerFrom.name}
        brokerTo={
          brokers.find(
            broker =>
              !!broker.accountTypes.find(
                accountType => accountType.id === brokerAccountTypeId
              )
          )!.name
        }
      />
    </form>
  );
};

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<ChangeBrokerFormValues> {}

interface OwnProps {
  currentAccountTypeId: string;
  onSubmit: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  id: string;
  brokers: Broker[];
  leverage: number;
}

enum FIELDS {
  brokerFrom = "brokerFrom",
  brokerAccountTypeId = "brokerAccountTypeId",
  leverage = "leverage"
}

export interface ChangeBrokerFormValues {
  [FIELDS.brokerAccountTypeId]: string;
  [FIELDS.leverage]: number;
  [FIELDS.brokerFrom]: Broker;
}

const ChangeBroker = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, ChangeBrokerFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: ({ brokers, currentAccountTypeId, leverage }) => ({
      [FIELDS.brokerFrom]: brokers.find(
        broker =>
          !!broker.accountTypes.find(
            accountType => accountType.id === currentAccountTypeId
          )
      )!,
      [FIELDS.brokerAccountTypeId]: currentAccountTypeId,
      [FIELDS.leverage]: leverage
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ChangeBroker);
export default ChangeBroker;
