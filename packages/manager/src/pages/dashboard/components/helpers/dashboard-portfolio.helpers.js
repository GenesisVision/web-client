import { EventLogoType } from "../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

export const profitabilityTypes = [
  EventLogoType.programPeriodEnds,
  EventLogoType.investorInvest,
  EventLogoType.investorWithdraw,
  EventLogoType.managerInvest,
  EventLogoType.managerWithdraw
];

export const isUseProfitability = event =>
  profitabilityTypes.includes(event.type);

export const valueDescriptionLocalizationConstant = event => {
  const type = event.type;
  if (
    type === EventLogoType.assetStarted ||
    type === EventLogoType.programPeriodStars
  )
    return "dashboard.portfolio-events.balance";
  if (type === EventLogoType.programPeriodEnds)
    return "dashboard.portfolio-events.profit";
  return null;
};
