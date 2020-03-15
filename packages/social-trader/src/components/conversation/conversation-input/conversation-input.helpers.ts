import { TFunction } from "i18next";
import { string } from "yup";

export const ConversationInputShape = (t: TFunction) =>
  string()
    .required()
    .max(100, t("Max count 100"));

export enum CONVERSATION_SUBMIT_TYPE {
  ENTER = "ENTER",
  CTRL_ENTER = "CTRL_ENTER"
}
