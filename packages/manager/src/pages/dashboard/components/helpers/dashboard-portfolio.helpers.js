import { EventLogoType } from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

export const profitabilityTypes = [EventLogoType.programPeriodEnds];

export const isUseProfitability = event =>
  profitabilityTypes.includes(event.type);

export const valueDescriptionLocalizationConstant = event => {
  const type = event.type;
  if (
    type === EventLogoType.assetStarted ||
    type === EventLogoType.programPeriodStars
  )
    return `${
      process.env.REACT_APP_PLATFORM
    }.dashboard-page.portfolio-events.balance`;
  if (type === EventLogoType.programPeriodEnds)
    return `${
      process.env.REACT_APP_PLATFORM
    }.dashboard-page.portfolio-events.profit`;
  return null;
};
