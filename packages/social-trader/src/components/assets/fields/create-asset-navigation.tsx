import { SubmitButton } from "components/submit-button/submit-button";
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
    <SubmitButton
      title={t(`buttons.create-${asset.toLowerCase()}`)}
      isPending={isSubmitting}
      isSuccessful={isSuccessful}
      disabled={disabled}
    >
      {t(`buttons.create-${asset.toLowerCase()}`)}
    </SubmitButton>
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
