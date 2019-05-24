import { EVENT_LOGO_TYPE } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import { ROLE_ENV } from "shared/constants/constants";

export const profitabilityTypes = [EVENT_LOGO_TYPE.PROGRAM_PREIOD_ENDS];

export const isUseProfitability = (type: EVENT_LOGO_TYPE): boolean =>
  profitabilityTypes.includes(type);

export const valueDescriptionLocalizationConstant = (
  type: EVENT_LOGO_TYPE
): string => {
  switch (type) {
    case EVENT_LOGO_TYPE.ASSET_STARTED:
    case EVENT_LOGO_TYPE.PROGRAM_PREIOD_STARTS:
      return `${ROLE_ENV}.dashboard-page.portfolio-events.balance`;
    case EVENT_LOGO_TYPE.PROGRAM_PREIOD_ENDS:
      return `${ROLE_ENV}.dashboard-page.portfolio-events.profit`;
    default:
      return "";
  }
};
