import { FormikProps, withFormik } from "formik";
import {
  assetDescriptionShape,
  assetTitleShape
} from "pages/create-program/components/create-program-settings/create-program-settings.validators";
import CreateProgramDescriptionField from "pages/create-program/components/create-program-settings/fields/create-program-description-field";
import CreateProgramLogoField from "pages/create-program/components/create-program-settings/fields/create-program-logo-field";
import CreateProgramTitleField from "pages/create-program/components/create-program-settings/fields/create-program-title-field";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import GVButton from "shared/components/gv-button";
import { SetSubmittingType } from "shared/utils/types";
import { object } from "yup";

const _ProgramEdit: React.FC<Props> = ({
  t,
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => (
  <form id="edit-form" onSubmit={handleSubmit}>
    <div className="program-edit__block-wrapper">
      <h3>{t("manager.program-settings.avatar.title")}</h3>
      <CreateProgramLogoField name={FIELDS.logo} />
    </div>
    <h3>{t("manager.program-settings.name.title")}</h3>
    <div className="program-edit__block-wrapper create-program-settings__row">
      <CreateProgramTitleField name={FIELDS.title} />
    </div>
    <h3>{t("manager.program-settings.strategy.title")}</h3>
    <div className="program-edit__block-wrapper create-program-settings__row">
      <CreateProgramDescriptionField
        name={FIELDS.description}
        description={values.description}
      />
    </div>
    <GVButton
      color="primary"
      type={"submit"}
      className="invest-form__submit-button"
      disabled={!dirty || !isValid || isSubmitting}
    >
      {t("manager.program-settings.buttons.save")}
    </GVButton>
  </form>
);

enum FIELDS {
  title = "title",
  logo = "logo",
  description = "description"
}

export interface ProgramEditFormValues {
  [FIELDS.title]: string;
  [FIELDS.description]: string;
  [FIELDS.logo]: IImageValue;
}

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<ProgramEditFormValues> {}

interface OwnProps {
  logo: IImageValue;
  title: string;
  description: string;
  onSubmit: (
    values: ProgramEditFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const ProgramEdit = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, ProgramEditFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: props => {
      return {
        [FIELDS.title]: props.title,
        [FIELDS.description]: props.description,
        [FIELDS.logo]: {
          src: props.logo.src
        }
      };
    },
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.title]: assetTitleShape(props.t),
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
