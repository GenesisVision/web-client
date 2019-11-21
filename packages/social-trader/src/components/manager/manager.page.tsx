import "./manager.page.scss";

import ManagerDescription from "components/manager/manager-description/manager-description";
import ManagerHistorySection from "components/manager/manager-history/manager-history-section";
import Page from "components/page/page";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { PublicProfile } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

const _ManagerPage: React.FC<Props> = ({ profile }) => {
  const [t] = useTranslation();
  return (
    <Page title={`${t("manager-page.title")} ${profile.username}`}>
      <div className="manager">
        <div className="manager__description">
          <ManagerDescription profile={profile} />
        </div>
        <div className="manager__history">
          <ManagerHistorySection
            ownerId={profile.id}
            title={profile.username}
          />
        </div>
      </div>
    </Page>
  );
};

interface Props {
  profile: PublicProfile;
}

const ManagerPage = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_ManagerPage);
export default ManagerPage;
