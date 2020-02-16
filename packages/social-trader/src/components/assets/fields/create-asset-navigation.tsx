import GVButton from "components/gv-button";
import { ASSET } from "constants/constants";
import React from "react";
import { useTranslation } from "react-i18next";

const _CreateAssetNavigation: React.FC<Props> = ({
  asset,
  isSubmitting,
  disabled,
  isSuccessful
}) => {
  const [t] = useTranslation();
  return (
    <GVButton
      title={t(`buttons.create-${asset.toLowerCase()}`)}
      color="primary"
      type="submit"
      isPending={isSubmitting}
      isSuccessful={isSuccessful}
      disabled={disabled}
    >
      {t(`buttons.create-${asset.toLowerCase()}`)}
    </GVButton>
  );
};

interface Props {
  asset: ASSET | string;
  disabled?: boolean;
  isSuccessful?: boolean;
  isSubmitting?: boolean;
}

const CreateAssetNavigation = React.memo(_CreateAssetNavigation);
export default CreateAssetNavigation;
