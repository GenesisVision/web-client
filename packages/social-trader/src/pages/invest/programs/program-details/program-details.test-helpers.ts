import { Page } from "puppeteer";
import { useTestHelpers } from "utils/test-helpers";

export const assetStatusSelector = ".asset-status";
export const investingAssetStatusSelector = `${assetStatusSelector}__investing`;
export const withdrawingAssetStatusSelector = `${assetStatusSelector}__withdrawing`;
export const activeAssetStatusSelector = `${assetStatusSelector}__active`;
export const cancelButtonSelector = `.request-line .gv-btn`;

export const cancelRequest = async (
  page: Page,
  statusSelector: string = assetStatusSelector
) => {
  const {
    waitForSelector,
    clearAlert,
    openPopup,
    submitForm,
    safeClick,
    hasElement
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useTestHelpers(page);
  await waitForSelector(
    ".details-investment-block.details-investment-block--investment"
  );
  const hasWithdrawingRequest = await hasElement(
    withdrawingAssetStatusSelector
  );
  const hasInvestingRequest = await hasElement(investingAssetStatusSelector);
  if (hasWithdrawingRequest || hasInvestingRequest) {
    await safeClick(statusSelector);
    await openPopup(cancelButtonSelector);
    await submitForm();
    await waitForSelector(activeAssetStatusSelector);
    await clearAlert();
  }
};
