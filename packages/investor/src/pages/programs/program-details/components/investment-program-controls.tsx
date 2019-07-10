import { ProgramDetailsFull } from "gv-api-web";
import ProgramDepositContainer from "modules/program-deposit/program-deposit";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import GVButton from "shared/components/gv-button";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";

import NotifyButton from "./notify-button";

const _InvestmentProgramControls: React.FC<Props> = ({
  isAuthenticated,
  t,
  programDescription
}) => {
  const [
    isOpenInvestmentPopup,
    setOpenInvestmentPopup,
    setCloseInvestmentPopup
  ] = useIsOpen();
  const [
    isOpenUnAuthInvestmentPopup,
    setOpenUnAuthInvestmentPopup,
    setCloseUnAuthInvestmentPopup
  ] = useIsOpen();

  const openInvestmentPopup = useCallback(
    () => {
      if (isAuthenticated) setOpenInvestmentPopup();
      else setOpenUnAuthInvestmentPopup();
    },
    [isAuthenticated]
  );

  const applyInvestmentChanges = useCallback(
    (updateDetails: () => void) => () => {
      updateDetails();
    },
    []
  );

  const notificationId = programDescription.personalProgramDetails
    ? programDescription.personalProgramDetails.notificationAvailableToInvestId
    : undefined;
  const isDisabledInvestButton = isAuthenticated
    ? !programDescription.personalProgramDetails ||
      !programDescription.personalProgramDetails.canInvest
    : false;
  return (
    <>
      <InvestmentProgramInfo programDescription={programDescription} />
      <div className="program-details-description__statistic-container program-details-description__statistic-container--btn">
        {programDescription.availableInvestmentBase === 0 && isAuthenticated ? (
          <NotifyButton
            canInvest={programDescription.personalProgramDetails.canInvest}
            currency={programDescription.currency}
            assetId={programDescription.id}
            notificationId={notificationId}
          />
        ) : (
          <GVButton
            className="program-details-description__invest-btn"
            onClick={openInvestmentPopup}
            disabled={isDisabledInvestButton}
          >
            {t("program-details-page.description.invest")}
          </GVButton>
        )}
      </div>
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: IProgramDetailContext) => (
          <ProgramDepositContainer
            currency={programDescription.currency}
            open={isOpenInvestmentPopup}
            id={programDescription.id}
            onClose={setCloseInvestmentPopup}
            onApply={applyInvestmentChanges(updateDetails)}
          />
        )}
      </ProgramDetailContext.Consumer>
      <InvestmentUnauthPopup
        message={t("program-details-page.description.unauth-popup")}
        asset={ASSET.PROGRAM}
        availableToInvestBase={programDescription.availableInvestmentBase}
        title={programDescription.title}
        currency={programDescription.currency}
        open={isOpenUnAuthInvestmentPopup}
        onClose={setCloseUnAuthInvestmentPopup}
      />
    </>
  );
};

const InvestmentProgramControls = translate()(
  React.memo(_InvestmentProgramControls)
);
export default InvestmentProgramControls;

interface OwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: ProgramDetailsFull;
}

interface Props extends WithTranslation, OwnProps {}
