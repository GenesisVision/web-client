import {
  convertTagToComponent,
  underTextComponentsMap
} from "components/conversation/tag/parse-to-tsx";
import { RowItem } from "components/row-item/row-item";
import { PostTag } from "gv-api-web";
import React from "react";
import { getSymbolIndexByTurn } from "utils/helpers";

const MAX_TEXT_BREAKS_COUNT = 5;
const MAX_TEXT_SYMBOLS_COUNT = 400;

export const reduceBySymbolsCount = (
  text: string,
  setTextExpandState: (state: boolean) => void
): string => {
  if (text.length > MAX_TEXT_SYMBOLS_COUNT) {
    setTextExpandState(false);
    const reducedText = text.slice(0, MAX_TEXT_SYMBOLS_COUNT);
    const lastTagIndex = reducedText.lastIndexOf("@-");
    const lastWordIndex = reducedText.lastIndexOf(" ");
    return ~lastTagIndex && lastTagIndex > MAX_TEXT_SYMBOLS_COUNT - 10
      ? reducedText.slice(0, lastTagIndex) + " ..."
      : reducedText.slice(0, lastWordIndex) + " ...";
  }
  return text;
};

export const reduceByBreaks = (
  text: string,
  setTextExpandState: (state: boolean) => void
): string => {
  const countBreaks = (text.match(/\n/g) || []).length;
  if (countBreaks > MAX_TEXT_BREAKS_COUNT) {
    setTextExpandState(false);
    const breakIndex = getSymbolIndexByTurn({
      text,
      symbol: "\n",
      turn: MAX_TEXT_BREAKS_COUNT
    });
    return text.slice(0, breakIndex) + " ...";
  }
  return text;
};

export const generateTagsComponents = (tags: PostTag[]): JSX.Element[] => {
  return tags.map(tag => (
    <RowItem wide={tag.type === "Post"}>
      {convertTagToComponent(tag, underTextComponentsMap)}
    </RowItem>
  ));
};
