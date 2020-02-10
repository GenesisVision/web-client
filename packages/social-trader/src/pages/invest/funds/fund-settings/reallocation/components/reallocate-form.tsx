import "../reallocate.scss";

import { DialogError } from "components/dialog/dialog-error";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { FormikProps, withFormik } from "formik";
import { FundAssetInfo, PlatformAsset } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import CreateFundSettingsAssetsComponent from "pages/create-fund/components/create-fund-settings/create-fund-settings-assets-block/create-fund-settings-assets-block";
import { assetsShape } from "pages/create-fund/components/create-fund-settings/create-fund-settings.validators";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { safeGetElemFromArray } from "utils/helpers";
import { PlatformAssetFull, SetSubmittingType } from "utils/types";
import { object } from "yup";

import ConfirmReallocate from "./confirm-reallocate";
import ReallocateField, { composeSelectedAssets } from "./reallocate-field";

const _ReallocateForm: React.FC<Props> = ({
  availableReallocationPercents,
  values: { currentAssets, assets },
  t,
  handleSubmit,
  isValid,
  dirty,
  errorMessage,
  isSubmitting,
  platformAssets
}) => {
  const [isOpenConfirm, setIsOpenConfirm, setIsCloseConfirm] = useIsOpen();
  return (
    <form
      className="reallocate-container"
      id="reallocate"
      onSubmit={handleSubmit}
    >
      <p className="asset-settings__text">
        {t("fund-settings.reallocation.text-1")}
        {availableReallocationPercents}%
      </p>
      <p className="asset-settings__text">
        {t("fund-settings.reallocation.text-2")}
      </p>
      <StatisticItem label={"Current"} condition={dirty}>
        <CreateFundSettingsAssetsComponent
          assets={
            composeSelectedAssets(currentAssets, platformAssets)
              .filter(item => item.percent > 0)
              .sort((a, b) => b.percent - a.percent) || []
          }
          remainder={0}
          canChange={false}
        />
      </StatisticItem>
      <StatisticItem label={dirty ? "New" : "Current"}>
        <GVFormikField
          name={FIELDS.assets}
          component={ReallocateField}
          assets={platformAssets}
        />
      </StatisticItem>
      {errorMessage && <DialogError error={errorMessage} />}
      <p className="asset-settings__text">
        {t("fund-settings.reallocation.text-3")}
      </p>
      <GVButton
        disabled={!isValid || !dirty || isSubmitting}
        onClick={setIsOpenConfirm}
      >
        {t("fund-settings.buttons.reallocation")}
      </GVButton>
      <ConfirmReallocate
        assets={assets}
        open={isOpenConfirm}
        onClose={setIsCloseConfirm}
        onApply={handleSubmit}
      />
    </form>
  );
};

enum FIELDS {
  currentAssets = "currentAssets",
  assets = "assets"
}

export interface IReallocateFormValues {
  [FIELDS.currentAssets]: PlatformAssetFull[];
  [FIELDS.assets]: PlatformAssetFull[];
}

export interface IReallocateFormOwnProps {
  availableReallocationPercents: number;
  fundAssets: FundAssetInfo[];
  platformAssets: PlatformAsset[];
  onSubmit(
    values: IReallocateFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
}

interface Props
  extends FormikProps<IReallocateFormValues>,
    IReallocateFormOwnProps,
    WithTranslation {}

const ReallocateForm = compose<
  React.FC<IReallocateFormOwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  withFormik<IReallocateFormOwnProps, IReallocateFormValues>({
    displayName: "reallocate",
    enableReinitialize: true,
    mapPropsToValues: ({ fundAssets, platformAssets }) => {
      const assets = fundAssets.map(fundAsset => {
        const platformAsset = safeGetElemFromArray(
          platformAssets,
          x => x.asset === fundAsset.symbol
        );
        return { ...platformAsset, percent: fundAsset.target };
      });

      return {
        [FIELDS.currentAssets]: [...assets],
        [FIELDS.assets]: assets
      };
    },
    validationSchema: (props: Props) =>
      object().shape({ [FIELDS.assets]: assetsShape(props.t) }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ReallocateForm);
export default ReallocateForm;
