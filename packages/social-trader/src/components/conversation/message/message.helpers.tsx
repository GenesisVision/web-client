import {
  convertTagToComponent,
  underTextComponentsMap
} from "components/conversation/tag/parse-to-tsx";
import { RowItem } from "components/row-item/row-item";
import { PostTag } from "gv-api-web";
import React from "react";

export const generateTagsComponents = (tags: PostTag[]): JSX.Element[] => {
  return tags.map(tag => (
    <RowItem wide={tag.type === "Post"}>
      {convertTagToComponent(tag, underTextComponentsMap)}
    </RowItem>
  ));
};
