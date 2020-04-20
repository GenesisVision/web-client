import { SocialViewMode } from "gv-api-web";

export enum PRIVACY_FORM_VALUES {
  whoCanPostToMayWall = "whoCanPostToMayWall",
  whoCanViewCommentsOnMyPosts = "whoCanViewCommentsOnMyPosts"
}

export interface IPrivacyData {
  [PRIVACY_FORM_VALUES.whoCanPostToMayWall]: SocialViewMode;
  [PRIVACY_FORM_VALUES.whoCanViewCommentsOnMyPosts]: SocialViewMode;
}

export interface IPrivacyData {
  [PRIVACY_FORM_VALUES.whoCanPostToMayWall]: SocialViewMode;
  [PRIVACY_FORM_VALUES.whoCanViewCommentsOnMyPosts]: SocialViewMode;
}
