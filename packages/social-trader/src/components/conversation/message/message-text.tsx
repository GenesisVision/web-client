import { Button } from "components/button/button";
import {
  reduceByBreaks,
  reduceBySymbolsCount
} from "components/conversation/message/message.helpers";
import {
  inTextComponentsMap,
  parseToTsx
} from "components/conversation/tag/parse-to-tsx";
import { Row } from "components/row/row";
import { PostTag } from "gv-api-web";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getLongWordsCount } from "utils/helpers";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";

interface Props {
  reduceLargeText?: boolean;
  tags?: PostTag[];
  text?: string;
}

const getTextToRender = ({
  text,
  reduceLargeText
}: {
  text?: string;
  reduceLargeText?: boolean;
}) => {
  if (!text) return;
  return reduceLargeText ? reduceByBreaks(reduceBySymbolsCount(text)) : text;
};

const Container = styled.div<{ hasLongWords?: boolean }>`
  ${fontSize($fontSizeParagraph)};
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  width: 100%;
  white-space: pre-wrap;
  ${({ hasLongWords }) =>
    hasLongWords && "overflow-wrap: anywhere; word-break: break-word;"};
`;

const _MessageText: React.FC<Props> = ({ tags, reduceLargeText, text }) => {
  const [textToRender, setTextToRender] = useState<string | undefined>(
    getTextToRender({
      text,
      reduceLargeText
    })
  );
  const [isTextExpanded, setTextExpandState] = useState<boolean | undefined>(
    textToRender?.length === text?.length
  );

  useEffect(() => {
    if (isTextExpanded) setTextToRender(text);
  }, [isTextExpanded]);

  const hasLongWords = !!textToRender && !!getLongWordsCount(textToRender);
  return (
    <Container hasLongWords={hasLongWords}>
      {textToRender && (
        <Row>
          <div>
            {parseToTsx({
              tags,
              text: textToRender,
              map: inTextComponentsMap
            })}
            {isTextExpanded === false && (
              <Button
                noPadding
                variant={"text"}
                onClick={() => setTextExpandState(true)}
              >
                <b>Expand</b>
              </Button>
            )}
          </div>
        </Row>
      )}
    </Container>
  );
};

export const MessageText = React.memo(_MessageText);
