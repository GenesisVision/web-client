import FormTextField from "components/assets/fields/form-text-field";
import { Button } from "components/button/button";
import { DialogError } from "components/dialog/dialog-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import withLoader from "decorators/with-loader";
import { FundAssetInfo, PlatformAsset } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { assetsShape } from "pages/create-fund/components/create-fund-settings/create-fund-settings.validators";
import AssetsComponent from "pages/invest/funds/fund-settings/reallocation/components/assets-block/assets-block";
import { ReallocateFieldWrapper } from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field-wrapper";
import {
  compareAssets,
  composeSelectedAssets
} from "pages/invest/funds/fund-settings/reallocation/reallocation.helpers";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { PlatformAssetFull } from "utils/types";
import { object } from "yup";

import ConfirmReallocate from "./confirm-reallocate";

enum FIELDS {
  currentAssets = "currentAssets",
  assets = "assets"
}

export interface IReallocateFormValues {
  [FIELDS.assets]: PlatformAssetFull[];
}

export interface Props {
  isPublic?: boolean;
  availableReallocationPercents: number;
  fundAssets: FundAssetInfo[];
  platformAssets: PlatformAsset[];
  onSubmit: (values: IReallocateFormValues) => void;
  errorMessage?: string;
}

const _ReallocateForm: React.FC<Props> = ({
  isPublic,
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
    <HookForm resetOnSuccess form={form}>
      <FormTextField>
        {isPublic
          ? t("fund-settings:reallocation.text-1-public")
          : t("fund-settings:reallocation.text-1")}
        {availableReallocationPercents}%
      </FormTextField>
      <Row>
        <FormTextField>{t("fund-settings:reallocation.text-2")}</FormTextField>
      </Row>
      {dirty && !equalWithCurrent && (
        <Row wide>
          <LabeledValue label={"Current"}>
            <AssetsComponent
              assets={savedCurrent || []}
              remainder={0}
              canChange={false}
            />
          </LabeledValue>
        </Row>
      )}
      <Row wide>
        <LabeledValue label={dirty ? "New" : "Current"}>
          <GVHookFormField
            scheduleMessage={t("trading-schedule.reallocate-fund")}
            name={FIELDS.assets}
            component={ReallocateFieldWrapper}
            assets={platformAssets}
          />
        </LabeledValue>
      </Row>
      {errorMessage && (
        <Row>
          <DialogError error={errorMessage} />
        </Row>
      )}
      {isPublic && (
        <Row>
          <FormTextField>
            {t("fund-settings:reallocation.text-3")}
          </FormTextField>
        </Row>
      )}
      <Row size={"large"}>
        <Button
          isPending={isSubmitting}
          isSuccessful={isSuccessful}
          disabled={disabled}
          onClick={setIsOpenConfirm}
        >
          {t("fund-settings:buttons.reallocation")}
        </Button>
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

const ReallocateForm = withLoader(React.memo(_ReallocateForm));
export default ReallocateForm;
