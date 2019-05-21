import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Page from "shared/components/page/page";
import RootState from "shared/reducers/root-reducer";

import { KYC_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from "./profile.constants";

const _ProfileLayout: React.FC<Props> = ({
  t,
  route,
  backPath,
  prevPath,
  children
}) => {
  return (
    <Page title={t("profile-page.title")}>
      <div className="app__main-wrapper">
        <h1>{t("profile-page.title")}</h1>
        <GVTabs value={route}>
          <GVTab
            label={
              <Link
                to={{
                  pathname: PROFILE_ROUTE,
                  state: backPath,
                  prevPath
                }}
              >
                {t("profile-page.tabs.personal-details")}
              </Link>
            }
            value="details"
          />
          <GVTab
            label={
              <Link
                to={{
                  pathname: KYC_ROUTE,
                  state: backPath,
                  prevPath
                }}
              >
                {t("profile-page.tabs.verify")}
              </Link>
            }
            value="verify"
          />
          <GVTab
            label={
              <Link
                to={{
                  pathname: SETTINGS_ROUTE,
                  state: backPath,
                  prevPath
                }}
              >
                {t("profile-page.tabs.settings")}
              </Link>
            }
            value="settings"
          />
        </GVTabs>
        {children}
      </div>
    </Page>
  );
};

const mapSateTotProps = (state: RootState): StateProps => ({
  backPath: state.router.location.state,
  prevPath: state.router.location.prevPath
});

const ProfileLayout = compose<React.ComponentType<OwnProps>>(
  connect(mapSateTotProps),
  translate()
)(_ProfileLayout);

export default ProfileLayout;

interface OwnProps {
  route: string;
}

interface StateProps {
  backPath: string;
  prevPath?: string;
}

interface Props extends OwnProps, StateProps, InjectedTranslateProps {}
