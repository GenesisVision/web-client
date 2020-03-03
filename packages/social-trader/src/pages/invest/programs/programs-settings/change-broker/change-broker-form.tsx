import { BROKER_CARD_EXTRA_STATE } from "components/assets/asset.constants";
import BrokerCard from "components/assets/broker-select/broker-card/broker-card";
import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Select, { ISelectChangeEvent } from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { withBlurLoader } from "decorators/with-blur-loader";
import { Broker, BrokerAccountType, BrokersProgramInfo } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import {
  CHANGE_BROKER_FORM_FIELDS,
  ChangeBrokerFormValues,
  HuobiWarning
} from "pages/invest/programs/programs-settings/change-broker/change-broker-form.helpers";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import ConfirmChangeBroker from "./confirm-change-broker";

const _ChangeBrokerForm: React.FC<Props> = ({
  errorMessage,
  isSignalProgram,
  currentLeverage,
  onSubmit,
  data: { brokers, currentAccountTypeId }
}) => {
  const [t] = useTranslation();
  const [brokerFrom] = useState<Broker>(
    safeGetElemFromArray(
      brokers,
      broker =>
        !!broker.accountTypes.find(
          accountType => accountType.id === currentAccountTypeId
        )
    )
  );
  const form = useForm<ChangeBrokerFormValues>({
    defaultValues: {
      [CHANGE_BROKER_FORM_FIELDS.brokerAccountTypeId]: currentAccountTypeId,
      [CHANGE_BROKER_FORM_FIELDS.leverage]: currentLeverage
    },
    mode: "onBlur"
  });
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { dirty, isSubmitting, isSubmitted }
  } = form;
  const { brokerAccountTypeId } = watch();
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
        brokerName === brokerFrom.name
          ? safeGetElemFromArray(
              broker.accountTypes,
              accountType => accountType.id === currentAccountTypeId
            )
          : broker.accountTypes[0];
      const leverage =
        brokerName === brokerFrom.name ? currentLeverage : account.leverages[0];
      setSelectedBroker(broker);
      setAccount(account);
      setValue(CHANGE_BROKER_FORM_FIELDS.brokerAccountTypeId, account.id, true);
      setValue(CHANGE_BROKER_FORM_FIELDS.leverage, leverage, true);
    },
    [brokers, currentLeverage, setValue, currentAccountTypeId]
  );
  const changeAccount = useCallback(
    ({ target: { value } }: ISelectChangeEvent) => {
      setAccount(
        safeGetElemFromArray(
          selectedBroker.accountTypes,
          account => account.id === value
        )
      );
    },
    [selectedBroker]
  );
  const changeLeverage = useCallback(
    ({ target: { value } }: ISelectChangeEvent) => {
      setValue(CHANGE_BROKER_FORM_FIELDS.leverage, +value, true);
    },
    [selectedBroker, setValue]
  );
  const handleOnApply = useCallback(() => {
    return handleSubmit(onSubmit);
  }, [handleSubmit, onSubmit]);
  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row wrap>
        {brokers.map(broker => (
          <RowItem bottomOffset key={broker.name}>
            <BrokerCard
              logo={broker.logo}
              brokerName={broker.name}
              isSelected={broker.name === selectedBroker.name}
              onSelect={selectBroker}
              cardState={BROKER_CARD_EXTRA_STATE.NONE}
              tags={broker.tags}
            />
          </RowItem>
        ))}
      </Row>
      <GVHookFormField
        name={CHANGE_BROKER_FORM_FIELDS.brokerAccountTypeId}
        component={SimpleTextField}
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
      </GVHookFormField>
      <GVHookFormField
        onChange={changeLeverage}
        disabled={currentAccountTypeId === brokerAccountTypeId}
        name={CHANGE_BROKER_FORM_FIELDS.leverage}
        component={SimpleTextField}
        label={t("create-program-page.settings.fields.brokers-leverage")}
        InputComponent={Select}
        disableIfSingle
      >
        {account.leverages.map(leverage => (
          <option value={leverage} key={leverage}>
            {leverage}
          </option>
        ))}
      </GVHookFormField>
      <HuobiWarning
        from={brokerFrom.name}
        to={selectedBroker.name}
        isSignalProgram={isSignalProgram}
      />
      <FormTextField>{t("program-settings.broker.text-change")}</FormTextField>
      <GVButton
        onClick={setChangeBrokerOpen}
        color="primary"
        className="invest-form__submit-button"
        isSuccessful={isSubmitted && !errorMessage}
        isPending={isSubmitting}
        disabled={
          !dirty || currentAccountTypeId === brokerAccountTypeId || isSubmitting
        }
      >
        {t("program-settings.buttons.change-broker")}
      </GVButton>
      <ConfirmChangeBroker
        onApply={handleOnApply}
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
    </HookForm>
  );
};

export interface Props {
  errorMessage?: string;
  data: BrokersProgramInfo;
  isSignalProgram: boolean;
  onSubmit: (values: ChangeBrokerFormValues) => void;
  id: string;
  currentLeverage: number;
}

const ChangeBrokerForm = withBlurLoader(React.memo(_ChangeBrokerForm));
export default ChangeBrokerForm;
