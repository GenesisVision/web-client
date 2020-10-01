import Page from "components/page/page";
import CreateFundSettingsSection from "pages/create-fund/components/create-fund-settings/create-fund-settings-section";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _CreateSelfManagedFundPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("create-fund-page:self-managed-title")}>
      <CreateFundSettingsSection selfManaged />
    </Page>
  );
};

const CreateSelfManagedFundPage = React.memo(_CreateSelfManagedFundPage);
export default CreateSelfManagedFundPage;
