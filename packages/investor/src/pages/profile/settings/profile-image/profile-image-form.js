import "./profile-image.scss";

import { withFormik } from "formik";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import InputPhoto, {
  getInputPhotoInitialValue
} from "shared/components/form/input-photo/input-photo";
import UserIcon from "shared/media/user-avatar.svg";
import * as Yup from "yup";

import InputPhotoValidation from "shared/components/form/input-photo/input-photo.validators";

class ProfileImageForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.avatar) {
      props.setFieldValue("logo", {
        ...props.values.logo,
        src: props.avatar
      });
    }
  }

  get isSubmitDisabled() {
    const { avatar, errors, values, isSubmitting } = this.props;
    const value = values.logo;

    if (isSubmitting) return true;
    if (!value.isUpdated) return true;
    if (!value.cropped && !avatar) return true;
    if (errors.logo) return true;

    return false;
  }

  render() {
    const { isSubmitDisabled } = this;

    const { t, handleSubmit, values, setFieldValue, errors } = this.props;

    const imageInputError =
      errors &&
      errors.logo &&
      (errors.logo.width || errors.logo.height || errors.logo.size);

    return (
      <div className="profile-image">
        <h3 className="profile-image__heading">
          {t("profile.settings.profile-image")}
        </h3>

        <div className="profile-image__requirements">
          {t("profile.settings.image-requirements")}
        </div>

        <InputPhoto
          name="logo"
          value={values.logo}
          defaultImage={UserIcon}
          onChange={setFieldValue}
          className="profile-image__input-image"
          error={imageInputError}
        />

        <GVButton
          color="primary"
          variant="outlined"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="profile-image__submit-btn"
        >
          {t("profile.settings.save-photo")}
        </GVButton>
      </div>
    );
  }
}

export default compose(
  translate(),
  withFormik({
    displayName: "ProfileImageForm",
    mapPropsToValues: props => ({
      logo: {
        ...getInputPhotoInitialValue(),
        src: props.avatar
      }
    }),
    validationSchema: ({ t }) =>
      Yup.object().shape({
        logo: InputPhotoValidation(t)
      }),
    handleSubmit: (values, { props, setSubmitting, setFieldValue }) => {
      props.handleSubmit(values.logo.cropped, src => {
        setFieldValue("logo", {
          ...values.logo,
          isUpdated: false,
          src,
          isCrop: false
        });
        setSubmitting(false);
      });
    }
  })
)(ProfileImageForm);
