import { push } from "connected-react-router";
import { Broker } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import useIsOpen from "shared/hooks/is-open.hook";
import useTab from "shared/hooks/tab.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { headerSelector } from "shared/reducers/header-reducer";
import { programsInfoSelector } from "shared/reducers/platform-reducer";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import { createProgram, fetchBrokers } from "../services/create-program.service";
import { TFAConfirmBlock } from "./confirm-block";
import CreateProgramBroker from "./create-program-broker/create-program-broker";
import CreateProgramSettingsSection from "./create-program-settings/create-program-settings-section";

const _CreateProgramContainer: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const currency = useSelector(currencySelector);
  const wallets = useSelector(walletsSelector);
  const headerData = useSelector(headerSelector);
  const programsInfo = useSelector(programsInfoSelector);

  const [minimumDepositsAmount, setMinimumDepositsAmount] = useState<
    { [key: string]: number } | undefined
  >(undefined);
  const [programId, setProgramId] = useState<string | undefined>(undefined);
  const [selectedBroker, setSelectedBroker] = useState<Broker | undefined>(
    undefined
  );
  const [brokers, setBrokers] = useState<Broker[] | undefined>(undefined);
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();
  const [twoFactorRequired, setTwoFactorRequired] = useIsOpen();
  const [
    isNavigationDialogVisible,
    setIsNavigationDialogVisible,
    setIsNavigationDialogNotVisible
  ] = useIsOpen();
  const { tab, setTab } = useTab<TAB>(TAB.BROKER);

  useEffect(() => {
    setIsPending();
    dispatch(fetchWallets(currency));
    fetchBrokers()
      .then(brokers => {
        setBrokers(brokers);
        setSelectedBroker(brokers[0]);
        setMinimumDepositsAmount(
          brokers[0].accountTypes[0].minimumDepositsAmount
        );
      })
      .finally(setIsNotPending);
  }, []);

  const confirmNavigateToBroker = useCallback(
    (setSubmitting: (isSubmitting: boolean) => void) => {
      setTab(null, TAB.BROKER);
      setSubmitting(false);
    },
    []
  );

  const navigateToSettings = useCallback(() => {
    setTab(null, TAB.SETTINGS);
  }, []);

  const createProgramHandle = (data: any, setSubmitting: SetSubmittingType) => {
    createProgram(data)
      .then(({ twoFactorRequired, programId }) => {
        if (twoFactorRequired) {
          setProgramId(programId);
          setTwoFactorRequired();
        } else {
          dispatch(push(DASHBOARD_ROUTE));
          dispatch(
            alertMessageActions.success(
              "manager.create-program-page.notifications.create-success"
            )
          );
          setSubmitting(false);
        }
      })
      .catch((error: ResponseError) => {
        dispatch(alertMessageActions.error(error.errorMessage));
      })
      .finally(() => {
        dispatch(fetchWallets(currency));
        setSubmitting(false);
      });
  };

  if (
    !brokers ||
    !selectedBroker ||
    !programsInfo ||
    !headerData ||
    !wallets.length ||
    !minimumDepositsAmount
  )
    return null;

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
      {!isPending && (
        <div>
          {tab === TAB.BROKER && (
            <CreateProgramBroker
              setSelectedBroker={setSelectedBroker}
              navigateToSettings={navigateToSettings}
              brokers={brokers}
              selectedBroker={selectedBroker}
              setMinimumDepositsAmount={setMinimumDepositsAmount}
              isForexAllowed={headerData.allowForex}
              isKycConfirmed={headerData.kycConfirmed}
            />
          )}
          {tab === TAB.SETTINGS && (
            <CreateProgramSettingsSection
              currency={currency}
              minimumDepositsAmount={minimumDepositsAmount}
              fetchWallets={currency => dispatch(fetchWallets(currency))}
              wallets={wallets}
              navigateBack={setIsNavigationDialogVisible}
              broker={selectedBroker}
              onSubmit={createProgramHandle}
              notifyError={message =>
                dispatch(alertMessageActions.error(message))
              }
              author={headerData.name}
              programsInfo={programsInfo}
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
      )}
    </div>
  );
};

enum TAB {
  BROKER = "BROKER",
  SETTINGS = "SETTINGS"
}

const CreateProgramContainer = React.memo(_CreateProgramContainer);
export default CreateProgramContainer;
