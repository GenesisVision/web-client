import React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";

const _CreateAssetNavigation: React.FC<Props> = ({
  asset,
  navigateBack,
  isSubmitting
}) => {
  const [t] = useTranslation();
  return (
    <div className="create-program-settings__navigation">
      <GVButton
        title={t(`buttons.create-${asset.toLowerCase()}`)}
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        {t(`buttons.create-${asset.toLowerCase()}`)}
      </GVButton>
      <GVButton
        variant="text"
        onClick={navigateBack}
        className="create-program-settings__navigation-back"
      >
        <>&larr; {t("buttons.back")}</>
      </GVButton>
    </div>
  );
};

interface Props {
  asset: ASSET;
  navigateBack: () => void;
  isSubmitting: boolean;
}

const CreateAssetNavigation = React.memo(_CreateAssetNavigation);
export default CreateAssetNavigation;
