import { FormikProps, withFormik } from "formik";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import ErrorMessage, {
  MESSAGE_TYPES
} from "shared/components/error-message/error-message";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import { anchorElType } from "shared/components/popover/popover";
import { SetSubmittingType } from "shared/utils/types";
import { array, number, object } from "yup";

class _ReallocateForm extends React.PureComponent<Props, State> {
  render() {
    const { anchor, assets, remainder } = this.state;
    const {
      t,
      handleSubmit,
      isValid,
      dirty,
      errors,
      errorMessage,
      isSubmitting
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
        {(errors.assets && (
          <ErrorMessage error={errors.assets} type={MESSAGE_TYPES.OVER} />
        )) ||
          (errors.remainder && (
            <ErrorMessage error={errors.remainder} type={MESSAGE_TYPES.OVER} />
          ))}

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
  assets = "assets",
  remainder = "remainder"
}

export interface IReallocateFormValues {
  [FIELDS.assets]: FundAssetPartWithIcon[];
  [FIELDS.remainder]: number;
}

export interface IReallocateFormOwnProps {
  assets: FundAssetPartWithIcon[];
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

interface State {
  assets: FundAssetPartWithIcon[];
  remainder: number;
  anchor?: anchorElType;
}

const ReallocateForm = compose<React.FC<IReallocateFormOwnProps>>(
  translate(),
  withFormik<IReallocateFormOwnProps, IReallocateFormValues>({
    displayName: "reallocate",
    enableReinitialize: true,
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.remainder]: number()
          .required(
            props.t("manager.create-fund-page.settings.validation.assets-share")
          )
          .max(
            0,
            props.t("manager.create-fund-page.settings.validation.assets-share")
          ),
        [FIELDS.assets]: array()
          .required(
            props.t("manager.create-fund-page.settings.validation.assets-count")
          )
          .min(
            2,
            props.t("manager.create-fund-page.settings.validation.assets-count")
          )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_ReallocateForm);
export default ReallocateForm;
