import "./profile.scss";

import { FormikProps, withFormik } from "formik";
import {
  ProfileFullViewModel,
  UpdatePersonalDetailViewModel
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import VerificationStatus from "shared/components/verification-status/verification-status";
import About from "shared/modules/about/about";
import { SetSubmittingType } from "shared/utils/types";

const _ProfileForm: React.FC<Props> = ({ t, info, handleSubmit }) => (
  <>
    <About about={info.about} userName={info.userName} />
    <form
      id="profile-form"
      className="profile__container"
      onSubmit={handleSubmit}
    >
      <table className={"profile"}>
        <tbody>
          <tr className="profile__title">
            <td className="profile__left">
              <h4 className="profile__subtitle">01</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4 className="profile__subtitle">
                {t("profile-page.contacts")}
              </h4>
              <VerificationStatus checked={info.phoneNumberConfirmed} />
            </td>
          </tr>
          <tr className="profile__content">
            <td className="profile__left">
              <span className="profile__stick" />
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <div className="profile__row">
                <GVFormikField
                  disabled // TODO change whe api will upgrade
                  label={t("profile-page.email")}
                  value={info.email}
                  component={GVTextField}
                  name="email"
                />
              </div>
            </td>
          </tr>
          <tr className="profile__title">
            <td className="profile__left">
              <h4 className="profile__subtitle">02</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4 className="profile__subtitle">
                {t("profile-page.personal-info")}
              </h4>
              <VerificationStatus
                verificationStatus={info.verificationStatus}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </>
);

enum FIELDS {
  firstName = "firstName",
  middleName = "middleName",
  lastName = "lastName",
  birthday = "birthday",
  citizenship = "citizenship",
  gender = "gender",
  documentId = "documentId",
  phoneNumber = "phoneNumber",
  country = "country",
  city = "city",
  address = "address",
  index = "index"
}

export interface IProfileFormOwnProps {
  onSubmit(values: ProfileFormValues, setSubmitting: SetSubmittingType): void;
  info: ProfileFullViewModel;
}
export interface ProfileFormValues extends UpdatePersonalDetailViewModel {}

interface Props
  extends InjectedTranslateProps,
    FormikProps<ProfileFormValues>,
    IProfileFormOwnProps {}

const ProfileForm = compose<React.ComponentType<IProfileFormOwnProps>>(
  translate(),
  withFormik<IProfileFormOwnProps, ProfileFormValues>({
    displayName: "profile-form",
    mapPropsToValues: ({ info }) => ({
      [FIELDS.firstName]: info.firstName,
      [FIELDS.middleName]: info.middleName,
      [FIELDS.lastName]: info.lastName,
      [FIELDS.birthday]: info.birthday, //moment(info.birthday).format(),
      [FIELDS.citizenship]: info.citizenship,
      [FIELDS.gender]: info.gender,
      [FIELDS.documentId]: "",
      [FIELDS.phoneNumber]: info.phone,
      [FIELDS.country]: info.country,
      [FIELDS.city]: info.city,
      [FIELDS.address]: info.address,
      [FIELDS.index]: info.index
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ProfileForm);
export default ProfileForm;
