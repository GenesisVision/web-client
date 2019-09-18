import "./manager.page.scss";

import { ManagerProfile } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import ManagerDescription from "shared/components/manager/manager-description/manager-description";
import ManagerHistorySection from "shared/components/manager/manager-history/manager-history-section";
import Page from "shared/components/page/page";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

const _ManagerPage: React.FC<Props> = ({ managerProfile }) => {
  const [t] = useTranslation();
  return (
    <Page title={`${t("manager-page.title")} ${managerProfile.username}`}>
      <div className="manager">
        <div className="manager__description">
          <ManagerDescription managerProfile={managerProfile} />
        </div>
        <div className="manager__history">
          <ManagerHistorySection
            managerId={managerProfile.id}
            title={managerProfile.username}
          />
        </div>
      </div>
    </Page>
  );
};

interface Props {
  managerProfile: ManagerProfile;
}

const ManagerPage = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_ManagerPage);
export default ManagerPage;
