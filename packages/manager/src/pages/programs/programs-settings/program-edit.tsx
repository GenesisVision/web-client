import { FormikProps, withFormik } from "formik";
import { assetDescriptionShape } from "pages/create-program/components/create-program-settings/create-program-settings.validators";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import InputImage, {
  IImageValue
} from "shared/components/form/input-image/input-image";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";
import ProgramDefaultImage from "shared/media/program-default-image.svg";
import { SetSubmittingType } from "shared/utils/types";
import { object } from "yup";

const _ProgramEdit: React.FC<Props> = ({
  t,
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => {
  const descriptionTrimmedLength = values.description.trim().length;
  return (
    <form id="edit-form" onSubmit={handleSubmit}>
      <div className="program-edit__block-wrapper">
        <h3>Avatar</h3>
        <GVFormikField
          name={FIELDS.logo}
          component={InputImage}
          defaultImage={ProgramDefaultImage}
        />
      </div>
      <div className="program-edit__block-wrapper">
        <h3>Strategy</h3>
        <GVFormikField
          type="textarea"
          name={FIELDS.description}
          label={t("manager.create-program-page.settings.fields.description")}
          component={GVTextField}
        />
        {descriptionTrimmedLength > 0 && (
          <span className="create-program-settings__description-chars">
            {descriptionTrimmedLength}
            <GVProgramPeriod
              start={0}
              end={500}
              value={descriptionTrimmedLength}
            />
          </span>
        )}
      </div>
      <GVButton
        color="primary-dark"
        type={"submit"}
        className="invest-form__submit-button"
        disabled={!dirty || !isValid || isSubmitting}
      >
        {"Save"}
      </GVButton>
    </form>
  );
};

enum FIELDS {
  logo = "logo",
  description = "description"
}

export interface ProgramEditFormValues {
  [FIELDS.description]: string;
  [FIELDS.logo]: IImageValue;
}

interface Props
  extends OwnProps,
    InjectedTranslateProps,
    FormikProps<ProgramEditFormValues> {}

interface OwnProps {
  logo: IImageValue;
  description: string;
  onSubmit: (
    values: ProgramEditFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const ProgramEdit = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, ProgramEditFormValues>({
    displayName: "edit-form",
    mapPropsToValues: props => {
      return {
        [FIELDS.description]: props.description,
        [FIELDS.logo]: {
          src: props.logo.src
        }
      };
    },
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.description]: assetDescriptionShape(props.t),
        [FIELDS.logo]: inputImageShape(props.t)
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ProgramEdit);
export default ProgramEdit;
