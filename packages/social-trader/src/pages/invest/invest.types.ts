import {
  FollowDetailsListItem,
  FundDetailsListItem,
  ProgramDetailsListItem
} from "gv-api-web";

export type InvestAssetsType = {
  programs: ProgramDetailsListItem[];
  funds: FundDetailsListItem[];
  follows: FollowDetailsListItem[];
};

export type InvestAssetType =
  | ProgramDetailsListItem
  | FundDetailsListItem
  | FollowDetailsListItem;
