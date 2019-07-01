import { LevelInfo, LevelsParamsInfo } from "gv-api-web";

const lerp = (from: number, to: number, progress: number) =>
  from * (1 - progress) + to * progress;

export const calcInvestmentScale = (
  programAge: number,
  genesisRatio: number,
  weightedVolumeScale: number,
  levelsParameters: LevelsParamsInfo
) => {
  if (genesisRatio < levelsParameters.genesisRatioHighRisk) {
    return 1;
  }

  const ageByVolume = programAge * weightedVolumeScale;
  const ageByVolumeGuard = Math.min(
    ageByVolume,
    levelsParameters.ageByVolumeMax
  );
  const progress = ageByVolumeGuard / levelsParameters.ageByVolumeMax;

  return lerp(
    levelsParameters.investmentScaleMin,
    levelsParameters.investmentScaleMax,
    progress * genesisRatio
  );
};

export const calcNewAvailableToInvest = (
  investmentScale: number,
  managerBalance: number,
  levelsParameters: LevelsParamsInfo
) => {
  const newAvailableToInvest = managerBalance * investmentScale;

  let newAvailableToInvestGuard = Math.min(
    newAvailableToInvest,
    levelsParameters.maxAvailableToInvest
  );
  newAvailableToInvestGuard = Math.max(
    newAvailableToInvestGuard,
    levelsParameters.minAvailableToInvest
  );
  return newAvailableToInvestGuard;
};

const scaleProgress = (x: number, currentLevel: number, nextLevel: number) =>
  ((x - currentLevel) / (nextLevel - currentLevel)) * 100;

export const calcLevel = (avToInvest: number, levels: LevelInfo[]) => {
  let maxLevelIdx = levels.findIndex(x => x.investmentLimit > avToInvest);
  if (maxLevelIdx === -1) maxLevelIdx = levels.length - 1;
  const minLevelIdx = Math.max(0, maxLevelIdx - 1);

  const progress = scaleProgress(
    avToInvest,
    levels[minLevelIdx].investmentLimit,
    levels[maxLevelIdx].investmentLimit
  );
  return [levels[minLevelIdx].level, progress];
};
