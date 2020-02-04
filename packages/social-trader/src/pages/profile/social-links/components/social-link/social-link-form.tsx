import "./social-link.scss";

import SocialLinkImage from "components/avatar/social-link/social-link";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { FormikProps, withFormik } from "formik";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { object, string } from "yup";

import { TOnEditLinkSubmitFunc } from "../social-links.container";

const _SocialLinkForm: React.FC<Props> = ({
  t,
  socialLink,
  values,
  handleSubmit,
  setFieldValue
}) => {
  const handleCancelClick = () => {
    setFieldValue(FORM_FIELD.linkValue, socialLink.value || "");
    setFieldValue(FORM_FIELD.isButtonsVisible, false);
  };

  return (
    <div className="social-link">
      <div className="social-logo">
        <SocialLinkImage url={socialLink.logo} alt={socialLink.name} />
      </div>
      <form className="social-link__form" onSubmit={handleSubmit}>
        <GVFormikField
          component={GVTextField}
          wrapperClassName="social-input__wrapper"
          adornmentClassName="social-input__adornment"
          labelClassName="social-input__label"
          type="text"
          name={FORM_FIELD.linkValue}
          label={socialLink.name}
          adornment={
            values.linkValue || values.isButtonsVisible ? socialLink.url : ""
          }
          adornmentPosition="start"
          onClick={() => {
            if (!values.isButtonsVisible)
              setFieldValue(FORM_FIELD.isButtonsVisible, true);
          }}
          autoComplete="off"
        />
        {values.isButtonsVisible && (
          <div>
            <GVButton type="submit" className="social-button">
              {t("buttons.save")}
            </GVButton>
            <GVButton
              color="secondary"
              variant="outlined"
              onClick={handleCancelClick}
            >
              {t("buttons.cancel")}
            </GVButton>
          </div>
        )}
      </form>
    </div>
  );
};

const SocialLinkForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, ISignalLinkFormValues>({
    displayName: "social-link-form",
    mapPropsToValues: props => ({
      [FORM_FIELD.linkValue]: props.socialLink.value || "",
      [FORM_FIELD.isButtonsVisible]: false
    }),
    validationSchema: (props: Props) =>
      object().shape({
        [FORM_FIELD.linkValue]: string()
          .trim()
          .max(
            100,
            props.t("profile-page.social-links.validation.link-max-length")
          )
      }),
    handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {
      props
        .onSubmit(
          { type: props.socialLink.type, value: values.linkValue },
          setSubmitting
        )
        .then(() => {
          setFieldValue(FORM_FIELD.isButtonsVisible, false);
        });
    },
    enableReinitialize: true
  })
)(_SocialLinkForm);
export default SocialLinkForm;

enum FORM_FIELD {
  linkValue = "linkValue",
  isButtonsVisible = "isButtonsVisible"
}

interface OwnProps {
  socialLink: SocialLinkViewModel;
  onSubmit: TOnEditLinkSubmitFunc;
}

interface ISignalLinkFormValues {
  [FORM_FIELD.linkValue]: string;
  [FORM_FIELD.isButtonsVisible]: boolean;
}

interface Props
  extends OwnProps,
    FormikProps<ISignalLinkFormValues>,
    WithTranslation {}
