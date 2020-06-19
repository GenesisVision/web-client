import { SocialViewMode } from "gv-api-web";

export enum PRIVACY_FORM_VALUES {
  whoCanCommentOnMyPosts = "whoCanCommentOnMyPosts",
  whoCanPostToMayWall = "whoCanPostToMayWall",
  whoCanViewCommentsOnMyPosts = "whoCanViewCommentsOnMyPosts"
}

export interface IPrivacyData {
  [PRIVACY_FORM_VALUES.whoCanCommentOnMyPosts]: SocialViewMode;
  [PRIVACY_FORM_VALUES.whoCanPostToMayWall]: SocialViewMode;
  [PRIVACY_FORM_VALUES.whoCanViewCommentsOnMyPosts]: SocialViewMode;
}
