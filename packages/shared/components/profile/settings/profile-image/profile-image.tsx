import "./profile-image.scss";

import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import InputImage, {
  IImageValue
} from "shared/components/form/input-image/input-image";
import imageValidationSchema from "shared/components/form/input-image/input-image.validation";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import UserIcon from "shared/media/user-avatar.svg";
import { SetSubmittingType } from "shared/utils/types";
import { object } from "yup";

const _ProfileImage: React.FC<InjectedFormikProps<Props, FormValues>> = ({
  t,
  avatar,
  handleSubmit,
  isValid,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="profile-image">
      <h3 className="profile-image__title">
        {t("profile-page.settings.profile-image")}
      </h3>

      <div className="profile-image__requirements">
        {t("profile-page.settings.image-requirements")}
      </div>

      <GVFormikField
        name="logo"
        component={InputImage}
        src={avatar}
        className="profile-image__input-image"
        defaultImage={UserIcon}
      />

      <GVButton
        type="submit"
        color="primary"
        variant="outlined"
        className="profile-image__submit-btn"
        disabled={isSubmitting || !isValid}
      >
        {t("profile-page.settings.save-photo")}
      </GVButton>
    </div>
  </form>
);

const ProfileImage = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FormValues>({
    displayName: "profile-image",
    mapPropsToValues: props => ({
      logo: {
        src: props.avatar
      }
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        logo: imageValidationSchema(t)
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values.logo, setSubmitting);
    }
  }),
  React.memo
)(_ProfileImage);

export default ProfileImage;

interface OwnProps {
  avatar: string;
  onSubmit(image: IImageValue, setSubmitting: SetSubmittingType): void;
}

interface Props extends OwnProps, InjectedTranslateProps {}

interface FormValues {
  logo: IImageValue;
}
