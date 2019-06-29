import { Broker, BrokerAccountType } from "gv-api-web";
import BrokerCard from "pages/create-program/components/create-program-broker/broker-card/broker-card";
import React, { useCallback, useState } from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import Select from "shared/components/select/select";

import { BROKER_CARD_EXTRA_STATE } from "pages/create-program/components/create-program-broker/broker-card/broker-card.constants";
import { FormikProps, withFormik } from "formik";
import GVTextField from "shared/components/gv-text-field";
import GVFormikField from "shared/components/gv-formik-field";
import { SetSubmittingType } from "shared/utils/types";

const _BrokerEdit: React.FC<Props> = ({
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
      {currentAccountTypeId !== values[FIELDS.brokerAccountTypeId] && (
        <div className="gv-text-field__wrapper">
          <GVFormikField
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
      )}
      <p className="program-edit__text program-edit__text--color-accent program-edit__text--padding-top">
        {t("manager.program-settings.broker.text")}
      </p>
      <GVButton
        type="submit"
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
    </form>
  );
};

interface Props
  extends OwnProps,
    InjectedTranslateProps,
    FormikProps<ChangeBrokerFormValues> {}

interface OwnProps {
  currentAccountTypeId: string;
  onSubmit: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  id: string;
  brokers: Broker[];
}

enum FIELDS {
  brokerAccountTypeId = "brokerAccountTypeId",
  leverage = "leverage"
}

export interface ChangeBrokerFormValues {
  [FIELDS.brokerAccountTypeId]: string;
  [FIELDS.leverage]: number;
}

const BrokerEdit = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, ChangeBrokerFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: props => {
      return {
        [FIELDS.brokerAccountTypeId]: props.currentAccountTypeId,
        [FIELDS.leverage]: 1
      };
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_BrokerEdit);
export default BrokerEdit;
