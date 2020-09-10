import { ConversationPinButton } from "components/conversation/conversation-pin-button/conversation-pin-button";
import { ConversationRemoveButton } from "components/conversation/conversation-remove-button/conversation-remove-button";
import { CopyLink } from "components/conversation/message/message-actions/copy-link";
import { ReportButton } from "components/conversation/message/message-actions/report/report.button";
import { SocialShareButton } from "components/conversation/message/message-actions/social-share/social-share.button";
import { PostEditButton } from "components/conversation/post/post-edit/post-edit.button";
import { ActionsIcon } from "components/icon/actions-icon";
import { TableCardActions } from "components/table/components/table-card/table-card-actions";
import { PostPersonalDetails } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import React from "react";
import styled from "styled-components";

interface Props {
  url: string;
  setPinned?: (value: boolean) => void;
  setDeleted: VoidFunction;
  isPinned?: boolean;
  id: string;
  onApply: VoidFunction;
  actions?: PostPersonalDetails;
}

const $actionIconSize = 15;

const Container = styled.div`
  position: relative;
  width: ${$actionIconSize}px;
  height: ${$actionIconSize}px;
`;
const Actions = styled.div`
  position: absolute;
  right: -${$actionIconSize}px;
  top: 0;
  cursor: pointer;
`;
const Icon = styled.div`
  width: ${$actionIconSize * 2}px;
  height: ${$actionIconSize}px;
`;

const _MessageActions: React.FC<Props> = ({
  url,
  setPinned,
  setDeleted,
  isPinned,
  id,
  onApply,
  actions
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();

  return (
    <Container>
      <Actions>
        <Icon onClick={setAnchor}>
          <ActionsIcon primary={!!anchor} />
        </Icon>
        <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
          {actions?.canEdit && (
            <PostEditButton
              clearAnchor={clearAnchor}
              id={id}
              onApply={onApply}
            />
          )}
          {actions?.canPin && setPinned && (
            <ConversationPinButton
              setPinned={setPinned}
              id={id}
              value={!!isPinned}
              onSuccess={onApply}
            />
          )}
          <CopyLink onApply={clearAnchor} url={url} />
          {actions && !actions.canDelete && (
            <ReportButton clearAnchor={clearAnchor} id={id} onApply={onApply} />
          )}
          {actions?.canDelete && (
            <ConversationRemoveButton id={id} onSuccess={setDeleted} />
          )}
          <SocialShareButton url={url} clearAnchor={clearAnchor} />
        </TableCardActions>
      </Actions>
    </Container>
  );
};

export const MessageActions = React.memo(_MessageActions);
