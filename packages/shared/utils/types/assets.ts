import { FundDetailsList, ProgramDetailsList } from "gv-api-web";

export function isProgram(
  asset: ProgramDetailsList | FundDetailsList
): asset is ProgramDetailsList {
  return "level" in asset;
}

export function isFund(
  asset: ProgramDetailsList | FundDetailsList
): asset is FundDetailsList {
  return "totalAssetsCount" in asset;
}
