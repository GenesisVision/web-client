import DescriptionField from "components/assets/fields/description-field";
import TitleField from "components/assets/fields/title-field";
import { IImageValue } from "components/form/input-image/input-image";
import inputImageShape from "components/form/input-image/input-image.validation";
import GVButton from "components/gv-button";
import LogoField from "components/logo-field/logo-field";
import SettingsBlock from "components/settings-block/settings-block";
import { FormikProps, withFormik } from "formik";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import {
  assetDescriptionShape,
  assetTitleShape
} from "utils/validators/validators";
import { object } from "yup";

enum FIELDS {
  title = "title",
  logo = "logo",
  description = "description"
}

const _AssetEdit: React.FC<Props> = ({
  t,
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => (
  <SettingsBlock>
    <form
      id="edit-form"
      className={"asset-settings-block__form"}
      onSubmit={handleSubmit}
    >
      <div className="asset-settings__block-wrapper">
        <h3>{t("asset-settings.avatar.title")}</h3>
        <LogoField name={FIELDS.logo} />
      </div>
      <h3>{t("asset-settings.name.title")}</h3>
      <div className="asset-settings__block-wrapper">
        <TitleField name={FIELDS.title} />
      </div>
      <h3>{t("asset-settings.strategy.title")}</h3>
      <div className="asset-settings__block-wrapper asset-settings__block-wrapper--wide">
        <DescriptionField
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
        {t("asset-settings.buttons.save")}
      </GVButton>
    </form>
  </SettingsBlock>
);

export interface AssetEditFormValues {
  [FIELDS.title]: string;
  [FIELDS.description]: string;
  [FIELDS.logo]: IImageValue;
}

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<AssetEditFormValues> {}

interface OwnProps {
  logo: IImageValue;
  title: string;
  description: string;
  onSubmit: (
    values: AssetEditFormValues,
    setSubmitting: SetSubmittingType,
    resetForm?: () => void
  ) => void;
}

const AssetEdit = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, AssetEditFormValues>({
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
    handleSubmit: (values, { props, setSubmitting, resetForm }) => {
      props.onSubmit(values, setSubmitting, resetForm);
    }
  }),
  React.memo
)(_AssetEdit);
export default AssetEdit;
