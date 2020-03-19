import { IImageValue } from "components/form/input-image/input-image";
import { NewPost } from "gv-api-web";
import { TFunction } from "i18next";
import { string } from "yup";

export const ConversationInputShape = (t: TFunction) =>
  string().max(100, t("Max count 100"));

export enum CONVERSATION_SUBMIT_TYPE {
  ENTER = "ENTER",
  CTRL_ENTER = "CTRL_ENTER"
}

export type IPostMessageValues = NewPost & {
  images: IImageValue[];
};

export const postMessageDefaultOptions: IPostMessageValues = {
  userId: (undefined as unknown) as string,
  postId: (undefined as unknown) as string,
  images: [],
  tags: [],
  text: ""
};
