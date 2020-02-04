import "./profile-image.scss";

import { IImageValue } from "components/form/input-image/input-image";
import imageValidationSchema from "components/form/input-image/input-image.validation";
import GVButton from "components/gv-button";
import LogoField from "components/logo-field/logo-field";
import { InjectedFormikProps, withFormik } from "formik";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { object } from "yup";

enum FIELDS {
  logo = "logo"
}

const _ProfileImage: React.FC<InjectedFormikProps<Props, FormValues>> = ({
  t,
  handleSubmit,
  isValid,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="profile-image">
      <LogoField name={FIELDS.logo} defaultImage={UserIcon} />
      <GVButton type="submit" disabled={isSubmitting || !isValid}>
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
      [FIELDS.logo]: {
        src: props.avatar
      }
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.logo]: imageValidationSchema(t)
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values[FIELDS.logo], setSubmitting);
    }
  }),
  React.memo
)(_ProfileImage);
export default ProfileImage;

interface OwnProps {
  avatar: string;
  onSubmit(image: IImageValue, setSubmitting: SetSubmittingType): void;
}

interface Props extends OwnProps, WithTranslation {}

interface FormValues {
  logo: IImageValue;
}
