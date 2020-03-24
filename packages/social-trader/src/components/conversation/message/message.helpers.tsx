import { RowItem } from "components/row-item/row-item";
import { PostTag } from "gv-api-web";
import React from "react";
import {
  convertTagToComponent,
  underTextComponentsMap
} from "utils/parse-to-tsx";

export const generateTagsComponents = (tags: PostTag[]): JSX.Element[] => {
  return tags.map(tag => (
    <RowItem bottomOffset>
      {convertTagToComponent(tag, underTextComponentsMap)}
    </RowItem>
  ));
};
