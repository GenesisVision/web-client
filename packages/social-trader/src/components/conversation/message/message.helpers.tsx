import {
  convertTagToComponent,
  underTextComponentsMap
} from "components/conversation/tag/parse-to-tsx";
import { RowItem } from "components/row-item/row-item";
import { PostTag, SocialPostTagType } from "gv-api-web";
import React from "react";
import styled from "styled-components";
import { getSymbolIndexByTurn } from "utils/helpers";
import { $paddingXsmall, $paddingXxxsmall } from "utils/style/sizes";

const MAX_TEXT_BREAKS_COUNT = 5;
const MAX_TEXT_SYMBOLS_COUNT = 400;

export const ExcludedTagsUnderText: SocialPostTagType[] = [
  "Url",
  "Event",
  "Post"
];

export const reduceBySymbolsCount = (text: string): string => {
  if (text.length > MAX_TEXT_SYMBOLS_COUNT) {
    const reducedText = text.slice(0, MAX_TEXT_SYMBOLS_COUNT);
    const lastTagIndex = reducedText.lastIndexOf("@-");
    const lastWordIndex = reducedText.lastIndexOf(" ");
    return ~lastTagIndex && lastTagIndex > MAX_TEXT_SYMBOLS_COUNT - 10
      ? reducedText.slice(0, lastTagIndex) + " ..."
      : reducedText.slice(0, lastWordIndex) + " ...";
  }
  return text;
};

export const reduceByBreaks = (text: string): string => {
  const countBreaks = (text.match(/\n/g) || []).length;
  if (countBreaks > MAX_TEXT_BREAKS_COUNT) {
    const breakIndex = getSymbolIndexByTurn({
      text,
      symbol: "\n",
      turn: MAX_TEXT_BREAKS_COUNT
    });
    return text.slice(0, breakIndex) + " ...";
  }
  return text;
};

interface ITagContainerProps {
  isLast: boolean;
}

const TagContainer = styled.div<ITagContainerProps>`
  padding-right: ${({ isLast }: ITagContainerProps) =>
    isLast ? `${$paddingXxxsmall}px` : `${$paddingXsmall}px`};
`;

export const generateTagsComponents = (
  tags: PostTag[],
  isCarousel?: boolean
): JSX.Element[] => {
  return tags.map((tag, index) =>
    isCarousel ? (
      <TagContainer isLast={index === tags.length - 1}>
        {convertTagToComponent(tag, underTextComponentsMap)}
      </TagContainer>
    ) : (
      <RowItem wide={tag.type === "Post"} key={index}>
        {convertTagToComponent(tag, underTextComponentsMap)}
      </RowItem>
    )
  );
};
