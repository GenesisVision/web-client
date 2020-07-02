import clsx from "clsx";
import {
  reduceByBreaks,
  reduceBySymbolsCount
} from "components/conversation/message/message.helpers";
import styles from "components/conversation/message/message.module.scss";
import {
  inTextComponentsMap,
  parseToTsx
} from "components/conversation/tag/parse-to-tsx";
import GVButton from "components/gv-button";
import { Row } from "components/row/row";
import { PostTag } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { getLongWordsCount } from "utils/helpers";

interface Props {
  reduceLargeText?: boolean;
  tags?: PostTag[];
  text?: string;
}

const _MessageText: React.FC<Props> = ({ tags, reduceLargeText, text }) => {
  const [textToRender, setTextToRender] = useState<string | undefined>();
  const [isTextExpanded, setTextExpandState] = useState<boolean | undefined>();

  useEffect(() => {
    if (!text) return;
    const newText = reduceLargeText
      ? reduceByBreaks(
          reduceBySymbolsCount(text, setTextExpandState),
          setTextExpandState
        )
      : text;

    setTextToRender(newText);
  }, [text]);

  useEffect(() => {
    if (isTextExpanded) setTextToRender(text);
  }, [isTextExpanded]);

  const hasLongWords = textToRender && !!getLongWordsCount(textToRender);
  return (
    <div
      className={clsx(styles["message__text"], {
        [styles["message__text--break-word"]]: hasLongWords
      })}
    >
      {textToRender && (
        <Row>
          <div>
            {parseToTsx({
              tags,
              text: textToRender,
              map: inTextComponentsMap
            })}
            {isTextExpanded === false && (
              <GVButton
                noPadding
                variant={"text"}
                onClick={() => setTextExpandState(true)}
              >
                <b>Expand</b>
              </GVButton>
            )}
          </div>
        </Row>
      )}
    </div>
  );
};

export const MessageText = React.memo(_MessageText);
