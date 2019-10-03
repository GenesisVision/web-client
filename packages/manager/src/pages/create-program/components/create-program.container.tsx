import { push } from "connected-react-router";
import { Broker } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import useIsOpen from "shared/hooks/is-open.hook";
import useTab from "shared/hooks/tab.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { nameSelector } from "shared/reducers/header-reducer";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";

import CreateProgramBroker from "./create-program-broker/create-program-broker";
import { CreateProgramSettingsSection } from "./create-program-settings/create-program-settings-section";
import { TFAConfirmBlock } from "./tfa-confirm-block";

const _CreateProgramContainer: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const author = useSelector(nameSelector);
  const currency = useSelector(currencySelector);

  const [minimumDepositsAmount, setMinimumDepositsAmount] = useState<
    { [key: string]: number } | undefined
  >(undefined);
  const [programId, setProgramId] = useState<string | undefined>(undefined);
  const [selectedBroker, setSelectedBroker] = useState<Broker | undefined>(
    undefined
  );
  const [twoFactorRequired, setTwoFactorRequired] = useIsOpen();
  const [
    isNavigationDialogVisible,
    setIsNavigationDialogVisible,
    setIsNavigationDialogNotVisible
  ] = useIsOpen();
  const { tab, setTab } = useTab<TAB>(TAB.BROKER);

  const confirmNavigateToBroker = useCallback(
    (setSubmitting: (isSubmitting: boolean) => void) => {
      setTab(null, TAB.BROKER);
      setSubmitting(false);
      setIsNavigationDialogNotVisible();
    },
    []
  );

  const navigateToSettings = useCallback(() => {
    setTab(null, TAB.SETTINGS);
  }, []);

  const onSubmit = useCallback(({ twoFactorRequired, programId }) => {
    if (twoFactorRequired) {
      setProgramId(programId);
      setTwoFactorRequired();
    } else {
      dispatch(push(DASHBOARD_ROUTE));
      dispatch(
        alertMessageActions.success(
          "manager.create-program-page.notifications.create-success",
          true
        )
      );
    }
  }, []);

  return (
    <div className="create-program-page__container">
      <div className="create-program-page__tabs">
        <GVTabs value={tab}>
          <GVTab
            value={TAB.BROKER}
            label={t("manager.create-program-page.tabs.select-broker")}
          />
          <GVTab
            value={TAB.SETTINGS}
            label={t("manager.create-program-page.tabs.settings")}
          />
        </GVTabs>
      </div>
      {tab === TAB.BROKER && (
        <CreateProgramBroker
          setSelectedBroker={setSelectedBroker}
          navigateToSettings={navigateToSettings}
          selectedBroker={selectedBroker}
          setMinimumDepositsAmount={setMinimumDepositsAmount}
        />
      )}
      {tab === TAB.SETTINGS && (
        <CreateProgramSettingsSection
          currency={currency}
          minimumDepositsAmount={minimumDepositsAmount!}
          navigateBack={setIsNavigationDialogVisible}
          broker={selectedBroker!}
          onSubmit={onSubmit}
          author={author}
        />
      )}
      {twoFactorRequired && <TFAConfirmBlock id={programId!} />}
      <ConfirmPopup
        open={isNavigationDialogVisible}
        onClose={setIsNavigationDialogNotVisible}
        onApply={confirmNavigateToBroker}
        body={t("manager.create-program-page.navigation-back-text")}
        applyButtonText={t("buttons.continue")}
      />
    </div>
  );
};

enum TAB {
  BROKER = "BROKER",
  SETTINGS = "SETTINGS"
}

const CreateProgramContainer = React.memo(_CreateProgramContainer);
export default CreateProgramContainer;
