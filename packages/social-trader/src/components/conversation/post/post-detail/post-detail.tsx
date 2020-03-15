import { MessageDetailType } from "components/conversation/conversation.types";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import React from "react";

const _PostDetail: React.FC<Props> = ({ detail: { title, value } }) => {
  return <StatisticItemInner label={title}>{value}</StatisticItemInner>;
};

interface Props {
  detail: MessageDetailType;
}

export const PostDetail = React.memo(_PostDetail);
