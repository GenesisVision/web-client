import "./public-info.scss";

import AboutField from "components/assets/fields/about-field";
import UserNameField from "components/assets/fields/user-name-field";
import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import { FormikProps, withFormik } from "formik";
import { UpdateProfileViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { assetTitleShape } from "utils/validators/validators";
import { object } from "yup";

const _PublicInfoForm: React.FC<Props> = ({
  values: { about },
  isPending,
  t,
  handleSubmit,
  errorMessage,
  isValid,
  dirty,
  isSubmitting
}) => {
  return (
    <form id="about-manager" onSubmit={handleSubmit} className="about">
      <UserNameField name={FIELDS.userName} />
      <AboutField description={about} name={FIELDS.about} />
      <FormError error={errorMessage} />
      <div className="profile__row">
        <GVButton
          type="submit"
          disabled={isPending || isSubmitting || !isValid || !dirty}
        >
          {t("buttons.save")}
        </GVButton>
      </div>
    </form>
  );
};

enum FIELDS {
  userName = "userName",
  about = "about"
}

export interface IAboutFormValues extends UpdateProfileViewModel {}

interface IAboutFormOwnProps {
  isPending: boolean;
  onSubmit: (
    values: IAboutFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  userName: string;
  about: string;
  errorMessage?: string;
}

interface Props
  extends WithTranslation,
    FormikProps<IAboutFormValues>,
    IAboutFormOwnProps {}

const PublicInfoForm = compose<React.ComponentType<IAboutFormOwnProps>>(
  translate(),
  withFormik<IAboutFormOwnProps, IAboutFormValues>({
    enableReinitialize: true,
    displayName: "about-manager",
    mapPropsToValues: ({ userName = "", about = "" }) => ({
      [FIELDS.userName]: userName,
      [FIELDS.about]: about
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({ [FIELDS.userName]: assetTitleShape(t) }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_PublicInfoForm);
export default PublicInfoForm;
