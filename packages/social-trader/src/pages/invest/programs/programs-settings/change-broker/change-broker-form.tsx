import { BROKER_CARD_EXTRA_STATE } from "components/assets/asset.constants";
import BrokerCard from "components/assets/broker-select/broker-card/broker-card";
import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select from "components/select/select";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { FormikProps, withFormik } from "formik";
import { Broker, BrokerAccountType, BrokersProgramInfo } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useState } from "react";
import {
  useTranslation,
  WithTranslation,
  withTranslation as translate
} from "react-i18next";
import { compose } from "redux";
import { safeGetElemFromArray } from "utils/helpers";
import { SetSubmittingType } from "utils/types";

import ConfirmChangeBroker from "./confirm-change-broker";

const _ChangeBrokerForm: React.FC<Props> = ({
  isSignalProgram,
  currentLeverage,
  handleSubmit,
  values,
  dirty,
  isSubmitting,
  setFieldValue,
  t,
  data: { brokers, currentAccountTypeId }
}) => {
  const [
    isChangeBrokerOpen,
    setChangeBrokerOpen,
    setChangeBrokerClose
  ] = useIsOpen();
  const [selectedBroker, setSelectedBroker] = useState<Broker>(
    safeGetElemFromArray(
      brokers,
      broker =>
        !!broker.accountTypes.find(
          accountType => accountType.id === currentAccountTypeId
        )
    )
  );
  const [account, setAccount] = useState<BrokerAccountType>(
    safeGetElemFromArray(
      selectedBroker.accountTypes,
      acc => acc.id === currentAccountTypeId
    )
  );
  const selectBroker = useCallback(
    (brokerName: string) => () => {
      const broker = safeGetElemFromArray(brokers, x => x.name === brokerName);
      const account =
        brokerName === values[FIELDS.brokerFrom].name
          ? safeGetElemFromArray(
              broker.accountTypes,
              accountType => accountType.id === currentAccountTypeId
            )
          : broker.accountTypes[0];
      const leverage =
        brokerName === values[FIELDS.brokerFrom].name
          ? currentLeverage
          : account.leverages[0];
      setSelectedBroker(broker);
      setAccount(account);
      setFieldValue(FIELDS.brokerAccountTypeId, account.id);
      setFieldValue(FIELDS.leverage, leverage);
    },
    [brokers, values, currentLeverage, setFieldValue, currentAccountTypeId]
  );
  const changeAccount = useCallback(
    ({ target }) => {
      setAccount(
        safeGetElemFromArray(
          selectedBroker.accountTypes,
          account => account.id === target.value
        )
      );
    },
    [selectedBroker]
  );
  const { brokerAccountTypeId, brokerFrom } = values;
  return (
    <form id="change-broker-form" onSubmit={handleSubmit}>
      <div className="program-settings__block-wrapper--broker-list">
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
          label={t("create-program-page.settings.fields.account-type")}
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
          label={t("create-program-page.settings.fields.brokers-leverage")}
          InputComponent={Select}
          disableIfSingle
        >
          {account.leverages.map(leverage => (
            <option value={leverage} key={leverage}>
              {leverage}
            </option>
          ))}
        </GVFormikField>
      </div>
      <HuobiWarning
        from={values[FIELDS.brokerFrom].name}
        to={selectedBroker.name}
        isSignalProgram={isSignalProgram}
      />
      <FormTextField>{t("program-settings.broker.text-change")}</FormTextField>
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
        {t("program-settings.buttons.change-broker")}
      </GVButton>
      <ConfirmChangeBroker
        open={isChangeBrokerOpen}
        onClose={setChangeBrokerClose}
        brokerFrom={brokerFrom.name}
        brokerTo={
          safeGetElemFromArray(
            brokers,
            broker =>
              !!broker.accountTypes.find(
                accountType => accountType.id === brokerAccountTypeId
              )
          ).name
        }
      />
    </form>
  );
};

interface Props
  extends ChangeBrokerFormOwnProps,
    WithTranslation,
    FormikProps<ChangeBrokerFormValues> {}

export interface ChangeBrokerFormOwnProps {
  data: BrokersProgramInfo;
  isSignalProgram: boolean;
  onSubmit: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  id: string;
  currentLeverage: number;
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

const ChangeBrokerForm = compose<
  React.ComponentType<
    ChangeBrokerFormOwnProps & WithBlurLoaderProps<BrokersProgramInfo>
  >
>(
  withBlurLoader,
  translate(),
  withFormik<ChangeBrokerFormOwnProps, ChangeBrokerFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: ({
      data: { brokers, currentAccountTypeId },
      currentLeverage
    }) => ({
      [FIELDS.brokerFrom]: safeGetElemFromArray(
        brokers,
        broker =>
          !!broker.accountTypes.find(
            accountType => accountType.id === currentAccountTypeId
          )
      ),
      [FIELDS.brokerAccountTypeId]: currentAccountTypeId,
      [FIELDS.leverage]: currentLeverage
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ChangeBrokerForm);
export default ChangeBrokerForm;

interface IHuobiWarningProps {
  from: string;
  to: string;
  isSignalProgram: boolean;
}
export const HuobiWarning: React.FC<IHuobiWarningProps> = ({
  from,
  to,
  isSignalProgram
}) => {
  const [t] = useTranslation();
  return from === "Genesis Markets" && to === "Huobi" && isSignalProgram ? (
    <FormTextField topPadding accent>
      {t("program-settings.broker.text-warning")}
    </FormTextField>
  ) : null;
};
