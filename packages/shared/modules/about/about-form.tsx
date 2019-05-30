import "./about.scss";

import { goBack } from "connected-react-router";
import { FormikProps, withFormik } from "formik";
import { UpdateProfileViewModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import GVScroll from "shared/components/scroll/gvscroll";
import { SetSubmittingType } from "shared/utils/types";

const _AboutForm: React.FC<Props> = ({
  t,
  handleSubmit,
  errorMessage,
  isValid,
  dirty,
  isSubmitting,
  service
}) => (
  <form id="about-manager" onSubmit={handleSubmit} className="about">
    <GVScroll autoHeight autoHeightMax={14000}>
      <table className={"profile"}>
        <tbody>
          <tr className="profile__content">
            <td className="profile__left" />
            <td className="profile__center" />
            <td className="profile__right">
              <div>
                <div className="profile__row">
                  <GVFormikField
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
                <div className="form-error">{errorMessage}</div>
              </div>
              <div className="profile__row">
                <GVButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  {t("buttons.save")}
                </GVButton>
                <GVButton
                  color="secondary"
                  variant="outlined"
                  onClick={service.goBack}
                >
                  {t("buttons.cancel")}
                </GVButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </GVScroll>
  </form>
);

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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { goBack },
    dispatch
  )
});

interface Props
  extends InjectedTranslateProps,
    FormikProps<IAboutFormValues>,
    IAboutFormOwnProps,
    DispatchProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  goBack: typeof goBack;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const AboutForm = compose<React.FunctionComponent<IAboutFormOwnProps>>(
  React.memo,
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  withFormik<IAboutFormOwnProps, IAboutFormValues>({
    displayName: "about-manager",
    mapPropsToValues: props => ({
      [FIELDS.userName]: props.userName || "",
      [FIELDS.about]: props.about || ""
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_AboutForm);
export default AboutForm;
