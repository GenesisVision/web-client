import AssetFormField from "components/assets/asset-fields/asset-form-field";
import DescriptionField from "components/assets/fields/description-field";
import TitleField from "components/assets/fields/title-field";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { Row } from "components/row/row";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { FundCreateAssetPlatformInfo } from "gv-api-web";
import {
  FUND_PUBLIC_FORM_FIELDS,
  IFundPublicFormValues
} from "modules/fund-public-popup/components/fund-public-edit-form/fund-public.validators";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import {
  convertShapeToRules,
  entryFeeShape,
  exitFeeShape
} from "utils/validators/validators";

interface Props {
  title: string;
  createFundInfo: FundCreateAssetPlatformInfo;
  editError?: boolean;
  inDialog?: boolean;
  onSubmit: (values: IFundPublicFormValues) => void;
}

const _FundPublicEdit: React.FC<Props> = ({
  title,
  createFundInfo: { maxEntryFee, maxExitFee },
  editError,
  inDialog,
  onSubmit
}) => {
  const [t] = useTranslation();

  const form = useForm<IFundPublicFormValues>({
    defaultValues: { title },
    mode: "onBlur"
  });

  const { description } = form.watch();

  const renderButton = () => (
    <SubmitButton wide={inDialog} isSuccessful={!editError}>
      {t("buttons.save")}
    </SubmitButton>
  );
  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      <TitleField name={FUND_PUBLIC_FORM_FIELDS.title} />
      <DescriptionField
        name={FUND_PUBLIC_FORM_FIELDS.description}
        description={description}
      />
      <Row onlyOffset>
        <AssetFormField
          wide
          name={FUND_PUBLIC_FORM_FIELDS.entryFee}
          label={t("asset-settings:fields.entry-fee")}
          adornment="%"
          component={SimpleNumberField}
          isAllowed={allowPositiveValuesNumberFormat(4)}
          hintTooltipContent={t(
            "create-fund-page:settings.hints.entry-fee-description",
            { maxFee: maxEntryFee }
          )}
          hintContent={t("create-fund-page:settings.hints.entry-fee")}
          rules={convertShapeToRules(entryFeeShape(t, maxEntryFee))}
        />
      </Row>
      <Row onlyOffset>
        <AssetFormField
          wide
          name={FUND_PUBLIC_FORM_FIELDS.exitFee}
          label={t("create-fund-page:settings.fields.exit-fee")}
          adornment="%"
          component={SimpleNumberField}
          isAllowed={allowPositiveValuesNumberFormat(4)}
          hintTooltipContent={t(
            "create-fund-page:settings.hints.exit-fee-description",
            {
              maxFee: maxExitFee
            }
          )}
          hintContent={t("create-fund-page:settings.hints.exit-fee")}
          rules={convertShapeToRules(exitFeeShape(t, maxExitFee))}
        />
      </Row>
      {inDialog ? (
        <DialogButtons>{renderButton()}</DialogButtons>
      ) : (
        <Row size={"large"}>{renderButton()}</Row>
      )}
    </HookForm>
  );
};

const FundPublicEdit = React.memo(_FundPublicEdit);
export default FundPublicEdit;
