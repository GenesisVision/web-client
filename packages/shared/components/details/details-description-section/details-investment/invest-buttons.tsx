import * as React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";

const _InvestButtons: React.FC<Props> = ({
  isOwnProgram = true,
  setIsOpenInvestPopup,
  isDisabledInvestButton,
  setIsOpenUnAuthInvestPopup
}) => {
  const [t] = useTranslation();
  return (
    <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
      {isOwnProgram ? (
        <GVButton
          className="details-description__invest-btn"
          onClick={setIsOpenInvestPopup}
          disabled={isDisabledInvestButton}
        >
          {t("program-details-page.description.invest")}
        </GVButton>
      ) : (
        <GVButton
          className="details-description__invest-btn"
          onClick={setIsOpenUnAuthInvestPopup}
        >
          {t("program-details-page.description.invest")}
        </GVButton>
      )}
    </div>
  );
};

interface Props {
  isOwnProgram?: boolean;
  isDisabledInvestButton: boolean;
  setIsOpenInvestPopup: () => void;
  setIsOpenUnAuthInvestPopup?: () => void;
}

export const InvestButtons = React.memo(_InvestButtons);
