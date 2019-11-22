import "./public-info.scss";

import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { FormikProps, withFormik } from "formik";
import { UpdateProfileViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { assetTitleShape } from "shared/utils/validators/validators";
import { SetSubmittingType } from "utils/types";
import { object } from "yup";

const _PublicInfoForm: React.FC<Props> = ({
  t,
  handleSubmit,
  errorMessage,
  isValid,
  dirty,
  isSubmitting
}) => {
  return (
    <form id="about-manager" onSubmit={handleSubmit} className="about">
      <div>
        <div className="profile__row">
          <GVFormikField
            type="text"
            label={t("profile-page.login")}
            component={GVTextField}
            name={FIELDS.userName}
            autoFocus
          />
        </div>
        <div className="profile__row">
          <GVFormikField
            label={t("profile-page.about")}
            component={GVTextField}
            type="textarea"
            name={FIELDS.about}
          />
        </div>
        <div className="form-error profile__form-error">{errorMessage}</div>
      </div>
      <div className="profile__row">
        <GVButton type="submit" disabled={isSubmitting || !isValid || !dirty}>
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
  onSubmit(values: IAboutFormValues, setSubmitting: SetSubmittingType): void;
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
