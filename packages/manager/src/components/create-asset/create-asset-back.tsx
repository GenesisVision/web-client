import React from "react";
import { useTranslation } from "react-i18next";
import BackButtonBody from "shared/components/back-button/back-button-body";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { ASSET } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";

const _CreateAssetBack: React.FC<Props> = ({ onApply, asset }) => {
  const [t] = useTranslation();
  const [
    isNavigationDialogVisible,
    setIsNavigationDialogVisible,
    setIsNavigationDialogNotVisible
  ] = useIsOpen();
  return (
    <>
      <BackButtonBody onClick={setIsNavigationDialogVisible} />
      <ConfirmPopup
        header={t("manager.create-asset-page.go-back")}
        open={isNavigationDialogVisible}
        onClose={setIsNavigationDialogNotVisible}
        onApply={() => {
          onApply();
          setIsNavigationDialogNotVisible();
        }}
        body={t(
          `manager.create-${asset.toLowerCase()}-page.navigation-back-text`
        )}
        applyButtonText={t("buttons.continue")}
      />
    </>
  );
};

interface Props {
  asset: ASSET;
  onApply: () => void;
}

export const CreateAssetBack = withLoader(React.memo(_CreateAssetBack));
