import { EventLogoType } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";
import { ROLE_ENV } from "shared/constants/constants";

export const profitabilityTypes = [EventLogoType.programPeriodEnds];

export const isUseProfitability = event =>
  profitabilityTypes.includes(event.type);

export const valueDescriptionLocalizationConstant = event => {
  const type = event.type;
  if (
    type === EventLogoType.assetStarted ||
    type === EventLogoType.programPeriodStars
  )
    return `${ROLE_ENV}.dashboard-page.portfolio-events.balance`;
  if (type === EventLogoType.programPeriodEnds)
    return `${ROLE_ENV}.dashboard-page.portfolio-events.profit`;
  return null;
};
