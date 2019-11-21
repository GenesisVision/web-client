import GVButton from "components/gv-button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _InvestButtons: React.FC<Props> = ({
  isOwnProgram = true,
  setIsOpenInvestPopup,
  isDisabledInvestButton,
  setIsOpenUnAuthInvestPopup
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
      {isAuthenticated && isOwnProgram ? (
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
