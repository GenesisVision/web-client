import { goBack } from "connected-react-router";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { nameSelector } from "shared/reducers/header-reducer";
import { platformDataSelector } from "shared/reducers/platform-reducer";
import { SetSubmittingType } from "shared/utils/types";

import {
  createFund,
  fetchMinimumDepositAmount
} from "../services/create-fund.service";
import { ICreateFundSettingsFormValues } from "./create-fund-settings/create-fund-settings";
import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const author = useSelector(nameSelector);
  const platformSettings = useSelector(platformDataSelector);
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
    },
    []
  );

  return (
    <>
      <CreateFundSettingsSection
        currency={currency}
        condition={!!platformSettings && !!minimumDepositAmount}
        navigateBack={setIsNavigationDialogVisible}
        onSubmit={handleSubmit}
        author={author}
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
      />
      <ConfirmPopup
        open={isNavigationDialogVisible}
        onClose={setNotIsNavigationDialogVisible}
        onApply={() => dispatch(goBack)}
        body={t("manager.create-fund-page.navigation-back-text")}
        applyButtonText={t("buttons.continue")}
      />
    </>
  );
};

const CreateFundContainer = React.memo(_CreateFundContainer);
export default CreateFundContainer;
