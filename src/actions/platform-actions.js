export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettings = {
  type: PLATFORM_SETTINGS,
  payload: Promise.resolve({
    isTournamentActive: true,
    tournamentCurrentRound: 1,
    tournamentTotalRounds: 4
  }) //SwaggerInvestorApi.apiInvestorPlatformStatusGet()
};

const platformActions = {
  fetchPlatformSettings
};

export default platformActions;
