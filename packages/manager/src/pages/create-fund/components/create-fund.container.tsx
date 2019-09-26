import { goBack } from "connected-react-router";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { nameSelector } from "shared/reducers/header-reducer";
import {
  fundAssetsSelector,
  platformDataSelector
} from "shared/reducers/platform-reducer";
import { rateApi } from "shared/services/api-client/rate-api";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import {
  createFund,
  fetchMinimumDepositAmount
} from "../services/create-fund.service";
import { ICreateFundSettingsFormValues } from "./create-fund-settings/create-fund-settings";
import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const wallets = useSelector(walletsSelector);
  const author = useSelector(nameSelector);
  const platformSettings = useSelector(platformDataSelector);
  const fundAssets = useSelector(fundAssetsSelector);
  const currency = useSelector(currencySelector);
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
    (
      values: ICreateFundSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      dispatch(createFund(values, setSubmitting));
      // dispatch(fetchWallets(currency));
    },
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
          currency={currency}
          condition={
            !!platformSettings && !!wallets.length && !!minimumDepositAmount
          }
          fetchWallets={(currency: CurrencyEnum) =>
            dispatch(fetchWallets(currency))
          }
          wallets={wallets}
          navigateBack={setIsNavigationDialogVisible}
          onSubmit={handleSubmit}
          author={author}
          assets={fundAssets}
          minimumDepositAmount={minimumDepositAmount}
          managerMaxExitFee={
            (platformSettings &&
              platformSettings!.programsInfo.managerMaxExitFee) ||
            0
          }
          managerMaxEntryFee={
            (platformSettings &&
              platformSettings!.programsInfo.managerMaxEntryFee) ||
            0
          }
          notifyError={(message: string) =>
            dispatch(alertMessageActions.error(message))
          }
          fetchRate={fetchRate}
        />
        <ConfirmPopup
          open={isNavigationDialogVisible}
          onClose={setNotIsNavigationDialogVisible}
          onApply={() => dispatch(goBack)}
          body={t("manager.create-fund-page.navigation-back-text")}
          applyButtonText={t("buttons.continue")}
        />
      </div>
    </div>
  );
};

const CreateFundContainer = React.memo(_CreateFundContainer);
export default CreateFundContainer;
