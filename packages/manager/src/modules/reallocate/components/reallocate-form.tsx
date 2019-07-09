import { FormikProps, withFormik } from "formik";
import {
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import { assetsShape } from "pages/create-fund/components/create-fund-settings/create-fund-settings.validators";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import { SetSubmittingType } from "shared/utils/types";
import { object } from "yup";

import ReallocateField from "./reallocate-field";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

class _ReallocateForm extends React.PureComponent<Props> {
  render() {
    const {
      t,
      handleSubmit,
      isValid,
      dirty,
      errorMessage,
      isSubmitting,
      platformAssets
    } = this.props;
    return (
      <form
        className="reallocate-container dialog__top"
        id="reallocate"
        onSubmit={handleSubmit}
      >
        <div className="dialog__header">
          <h2>{t("manager.reallocate.title")}</h2>
        </div>
        <GVFormikField
          name={FIELDS.assets}
          component={ReallocateField}
          assets={platformAssets}
        />
        <div className="reallocate-container__form-error">
          <FormError error={errorMessage} />
        </div>
        <div className="dialog__buttons">
          <GVButton
            type={"submit"}
            disabled={!isValid || !dirty || isSubmitting}
          >
            {t("manager.reallocate.apply")}
          </GVButton>
        </div>
      </form>
    );
  }
}

enum FIELDS {
  assets = "assets"
}

export interface IReallocateFormValues {
  [FIELDS.assets]: FundAssetPart[];
}

export interface IReallocateFormOwnProps {
  fundAssets: FundAssetPartWithIcon[];
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
    InjectedTranslateProps {}

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
        const platformAsset = platformAssets.find(
          x => x.asset === fundAsset.asset
        )!;
        return { id: platformAsset.id, percent: fundAsset.percent };
      });

      return {
        [FIELDS.assets]: assets
      };
    },
    validationSchema: (props: Props) =>
      object().shape({ [FIELDS.assets]: assetsShape(props.t) }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_ReallocateForm);
export default ReallocateForm;
