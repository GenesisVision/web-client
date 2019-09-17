import { goBack } from "connected-react-router";
import { PlatformAsset, PlatformInfo, WalletData } from "gv-api-web";
import React, { useCallback, useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { nameSelector } from "shared/reducers/header-reducer";
import {
  fundAssetsSelector,
  platformDataSelector
} from "shared/reducers/platform-reducer";
import { rateApi } from "shared/services/api-client/rate-api";
import { SetSubmittingType } from "shared/utils/types";

import {
  createFund,
  fetchMinimumDepositAmount
} from "../services/create-fund.service";
import { ICreateFundSettingsFormValues } from "./create-fund-settings/create-fund-settings";
import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC<Props> = ({
  t,
  author,
  service,
  platformSettings,
  fundAssets,
  wallets
}) => {
  const { data: minimumDepositAmount, sendRequest } = useApiRequest({
    request: fetchMinimumDepositAmount
  });
  const [
    isNavigationDialogVisible,
    setIsNavigationDialogVisible,
    setNotIsNavigationDialogVisible
  ] = useIsOpen();
  useEffect(() => {
    sendRequest();
  }, []);
  const handleSubmit = useCallback(
    (values: ICreateFundSettingsFormValues, setSubmitting: SetSubmittingType) =>
      service.createFund(values, setSubmitting),
    []
  );
  const fetchRate = useCallback(
    (fromCurrency: string, toCurrency: string) =>
      rateApi.v10RateByFromByToGet(fromCurrency, toCurrency),
    []
  );
  return (
    <div className="create-fund-container">
      <div>
        <CreateFundSettingsSection
          condition={
            !!platformSettings && !!wallets.length && !!minimumDepositAmount
          }
          fetchWallets={service.fetchWallets}
          wallets={wallets}
          navigateBack={setIsNavigationDialogVisible}
          onSubmit={handleSubmit}
          author={author}
          assets={fundAssets}
          minimumDepositAmount={minimumDepositAmount}
          managerMaxExitFee={platformSettings!.programsInfo.managerMaxExitFee}
          managerMaxEntryFee={platformSettings!.programsInfo.managerMaxEntryFee}
          notifyError={service.notifyError}
          fetchRate={fetchRate}
        />
        <ConfirmPopup
          open={isNavigationDialogVisible}
          onClose={setNotIsNavigationDialogVisible}
          onApply={service.goBack}
          body={t("manager.create-fund-page.navigation-back-text")}
          applyButtonText={t("buttons.continue")}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  wallets: walletsSelector(state),
  author: nameSelector(state),
  platformSettings: platformDataSelector(state),
  fundAssets: fundAssetsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      goBack,
      createFund,
      fetchWallets,
      notifyError: alertMessageActions.error
    },
    dispatch
  )
});

const CreateFundContainer = compose<React.ComponentType>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_CreateFundContainer);
export default CreateFundContainer;

interface StateProps {
  wallets: WalletData[];
  author: string;
  platformSettings: PlatformInfo | undefined;
  fundAssets: PlatformAsset[];
}

interface ServiceThunks extends ActionCreatorsMapObject {
  goBack: typeof goBack;
  createFund: typeof createFund;
  fetchWallets: typeof fetchWallets;
  notifyError: typeof alertMessageActions.error;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends StateProps, DispatchProps, WithTranslation {}
