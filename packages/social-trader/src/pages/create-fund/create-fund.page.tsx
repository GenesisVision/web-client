import Page from "components/page/page";
import CreateFundSettingsSection from "pages/create-fund/components/create-fund-settings/create-fund-settings-section";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _CreateFundPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("create-fund-page:title")}>
      <CreateFundSettingsSection />
    </Page>
  );
};

const CreateFundPage = React.memo(_CreateFundPage);

export default CreateFundPage;
