import { Button } from "components/button/button";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { CloseableAssetType } from "modules/asset-settings/close-asset/close-asset";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { twoFactorValidator } from "utils/validators/validators";
import { object } from "yup";

enum FIELDS {
  twoFactorCode = "twoFactorCode"
}

const _CloseAssetForm: React.FC<Props> = ({
  errorMessage,
  asset,
  onCancel,
  twoFactorEnabled,
  onSubmit,
  assetName
}) => {
  const [t] = useTranslation();
  const form = useForm<ICloseAssetFormValues>({
    defaultValues: {
      [FIELDS.twoFactorCode]: ""
    },
    validationSchema: object().shape({
      [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
    })
  });
  const {
    formState: { isSubmitting }
  } = form;

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogTop
        title={t(
          `asset-settings:period-and-closing.close-confirm-title-${asset.toLowerCase()}`
        )}
        subtitle={assetName}
      />
      <DialogBottom>
        <Row>
          {t(
            `asset-settings:period-and-closing.close-confirm-notification-${asset.toLowerCase()}`
          )}
        </Row>
        {twoFactorEnabled && (
          <Row>
            <GVHookFormField
              wide
              type="tel"
              name={FIELDS.twoFactorCode}
              label={t("labels.two-factor-code-label")}
              autoComplete="off"
              component={SimpleTextField}
            />
          </Row>
        )}
        <DialogButtons>
          <SubmitButton
            checkValid={false}
            checkDirty={false}
            isSuccessful={!errorMessage}
          >
            {t("buttons.confirm")}
          </SubmitButton>
          <Button
            color="secondary"
            variant="outlined"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            {t("buttons.cancel")}
          </Button>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

interface Props {
  errorMessage?: string;
  assetName?: string;
  asset: CloseableAssetType;
  onCancel: () => void;
  twoFactorEnabled: boolean;
  onSubmit: (values: ICloseAssetFormValues) => void;
}

export interface ICloseAssetFormValues {
  [FIELDS.twoFactorCode]: string;
}

const CloseAssetForm = React.memo(_CloseAssetForm);
export default CloseAssetForm;
