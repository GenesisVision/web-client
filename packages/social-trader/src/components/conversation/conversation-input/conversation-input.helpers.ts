import { IImageValue } from "components/form/input-image/input-image";
import { NewPost, NewPostImage } from "gv-api-web";

export enum CONVERSATION_SUBMIT_TYPE {
  ENTER = "ENTER",
  CTRL_ENTER = "CTRL_ENTER"
}

export type IPostMessageValues = NewPost & {
  images: IImageValue[];
};

export const getPostMessageDefaultOptions = ({
  userId = (undefined as unknown) as string,
  postId = (undefined as unknown) as string,
  images = [] as Array<IImageValue & NewPostImage>,
  text = ""
}: {
  userId?: string;
  postId?: string;
  images?: Array<IImageValue & NewPostImage>;
  text?: string;
}): IPostMessageValues => ({
  userId,
  postId,
  images,
  text
});

export const postMessageDefaultOptions: IPostMessageValues = {
  userId: (undefined as unknown) as string,
  postId: (undefined as unknown) as string,
  images: [],
  text: ""
};
