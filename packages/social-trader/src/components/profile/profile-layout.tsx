import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Link from "components/link/link";
import Page from "components/page/page";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";

import {
  KYC_ROUTE,
  PERSONAL_DETAILS,
  PERSONAL_DETAILS_ROUTE,
  PROFILE,
  PROFILE_ROUTE,
  REFERRAL_PROGRAM,
  REFERRAL_PROGRAM_ROUTE,
  SECURITY,
  SECURITY_ROUTE,
  SETTINGS,
  SETTINGS_ROUTE,
  VERIFY
} from "./profile.constants";

const tabs = [
  { pathname: PROFILE_ROUTE, value: PROFILE },
  { pathname: PERSONAL_DETAILS_ROUTE, value: PERSONAL_DETAILS },
  { pathname: KYC_ROUTE, value: VERIFY, hideable: true },
  { pathname: SETTINGS_ROUTE, value: SETTINGS },
  { pathname: SECURITY_ROUTE, value: SECURITY },
  { pathname: REFERRAL_PROGRAM_ROUTE, value: REFERRAL_PROGRAM }
];

const ProfileLayout: React.FC<Props> = ({ route, children }) => {
  const [t] = useTranslation();
  const verified = useSelector(kycConfirmedSelector);
  return (
    <Page showTitle title={t("profile-page:title")}>
      <GVTabs value={route}>
        {tabs
          .filter(tab => !tab.hideable || !verified)
          .map(({ value, pathname }) => (
            <GVTab
              key={value}
              label={
                <Link
                  noColor
                  to={{
                    pathname
                  }}
                >
                  {t(`profile-page:tabs.${value}`)}
                </Link>
              }
              value={value}
            />
          ))}
      </GVTabs>
      <Row onlyOffset size={"large"}>
        {children}
      </Row>
    </Page>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  route: string;
}

export default ProfileLayout;
