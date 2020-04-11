import FormTextField from "components/assets/fields/form-text-field";
import { DialogError } from "components/dialog/dialog-error";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import { FundAssetInfo, PlatformAsset } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import CreateFundSettingsAssetsComponent from "pages/create-fund/components/create-fund-settings/create-fund-settings-assets-block/create-fund-settings-assets-block";
import { assetsShape } from "pages/create-fund/components/create-fund-settings/create-fund-settings.validators";
import {
  compareAssets,
  composeSelectedAssets
} from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field";
import { ReallocateFieldWrapper } from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field-wrapper";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { PlatformAssetFull } from "utils/types";
import { object } from "yup";

import "../reallocate.scss";
import ConfirmReallocate from "./confirm-reallocate";

enum FIELDS {
  currentAssets = "currentAssets",
  assets = "assets"
}

const _ReallocateForm: React.FC<Props> = ({
  fundAssets,
  onSubmit,
  availableReallocationPercents,
  errorMessage,
  platformAssets
}) => {
  const [t] = useTranslation();
  const initAssets = fundAssets.map(fundAsset => {
    const platformAsset = safeGetElemFromArray(
      platformAssets,
      x => x.asset === fundAsset.symbol
    );
    return { ...platformAsset, percent: fundAsset.target };
  });
  const [currentAssets] = useState([...initAssets]);

  const form = useForm<IReallocateFormValues>({
    defaultValues: {
      [FIELDS.assets]: initAssets
    },
    validationSchema: object().shape({ [FIELDS.assets]: assetsShape(t) }),
    mode: "onBlur"
  });
  const {
    handleSubmit,
    watch,
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const { assets } = watch();

  const savedCurrent = composeSelectedAssets(currentAssets, platformAssets)
    .filter(item => item.percent > 0)
    .sort((a, b) => b.percent - a.percent);
  const equalWithCurrent = compareAssets(savedCurrent, assets);

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled =
    !isValid || !dirty || isSubmitting || isSuccessful || equalWithCurrent;

  const [isOpenConfirm, setIsOpenConfirm, setIsCloseConfirm] = useIsOpen();
  return (
    <HookForm className="reallocate-container" resetOnSuccess form={form}>
      <FormTextField>
        {t("fund-settings.reallocation.text-1")}
        {availableReallocationPercents}%
      </FormTextField>
      <Row>
        <FormTextField>{t("fund-settings.reallocation.text-2")}</FormTextField>
      </Row>
      <Row>
        <StatisticItem label={"Current"} condition={dirty && !equalWithCurrent}>
          <CreateFundSettingsAssetsComponent
            assets={savedCurrent || []}
            remainder={0}
            canChange={false}
          />
        </StatisticItem>
      </Row>
      <StatisticItem label={dirty ? "New" : "Current"}>
        <GVHookFormField
          name={FIELDS.assets}
          component={ReallocateFieldWrapper}
          assets={platformAssets}
        />
      </StatisticItem>
      {errorMessage && <DialogError error={errorMessage} />}
      <Row>
        <FormTextField>{t("fund-settings.reallocation.text-3")}</FormTextField>
      </Row>
      <Row large>
        <GVButton
          isPending={isSubmitting}
          isSuccessful={isSuccessful}
          disabled={disabled}
          onClick={setIsOpenConfirm}
        >
          {t("fund-settings.buttons.reallocation")}
        </GVButton>
      </Row>
      <ConfirmReallocate
        assets={assets}
        open={isOpenConfirm}
        onClose={setIsCloseConfirm}
        onApply={handleSubmit(onSubmit)}
      />
    </HookForm>
  );
};

export interface IReallocateFormValues {
  [FIELDS.assets]: PlatformAssetFull[];
}

export interface Props {
  availableReallocationPercents: number;
  fundAssets: FundAssetInfo[];
  platformAssets: PlatformAsset[];

  onSubmit(values: IReallocateFormValues): void;

  errorMessage?: string;
}

const ReallocateForm = withLoader(React.memo(_ReallocateForm));
export default ReallocateForm;
