import React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";

const _CreateAssetNavigation: React.FC<Props> = ({ asset, isSubmitting }) => {
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
    </div>
  );
};

interface Props {
  asset: ASSET | string;
  isSubmitting?: boolean;
}

const CreateAssetNavigation = React.memo(_CreateAssetNavigation);
export default CreateAssetNavigation;
