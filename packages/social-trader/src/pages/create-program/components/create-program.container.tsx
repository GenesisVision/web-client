import React from "react";
import { useTranslation } from "react-i18next";

import { CreateProgramSettingsSection } from "./create-program-settings/create-program-settings-section";

const _CreateProgramContainer: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <>
      <div className="create-asset__header">
        <h1>{t("create-program-page.title")}</h1>
      </div>
      <div className="create-asset__content">
        <CreateProgramSettingsSection />
      </div>
    </>
  );
};

interface Props {}

const CreateProgramContainer = React.memo(_CreateProgramContainer);
export default CreateProgramContainer;
