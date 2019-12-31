import BackButtonBody from "components/back-button/back-button-body";
import ConfirmPopup from "components/confirm-popup/confirm-popup";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";

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
        header={t("create-asset-page.go-back")}
        open={isNavigationDialogVisible}
        onClose={setIsNavigationDialogNotVisible}
        onApply={() => {
          onApply();
          setIsNavigationDialogNotVisible();
        }}
        body={t(`create-${asset.toLowerCase()}-page.navigation-back-text`)}
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
