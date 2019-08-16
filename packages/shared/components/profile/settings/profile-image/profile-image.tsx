import "./profile-image.scss";

import { InjectedFormikProps, withFormik } from "formik";
import LogoField from "manager-web-portal/src/modules/asset-settings/fields/logo-field";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import imageValidationSchema from "shared/components/form/input-image/input-image.validation";
import GVButton from "shared/components/gv-button";
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

enum FIELDS {
  logo = "logo"
}

interface OwnProps {
  avatar: string;
  onSubmit(image: IImageValue, setSubmitting: SetSubmittingType): void;
}

interface Props extends OwnProps, WithTranslation {}

interface FormValues {
  logo: IImageValue;
}
