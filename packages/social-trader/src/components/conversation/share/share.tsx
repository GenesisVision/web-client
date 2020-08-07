import { Center } from "components/center/center";
import { getPostRepostsUsers } from "components/conversation/conversation.service";
import { ShareIcon } from "components/conversation/icons/share.icon";
import { RePostDialog } from "components/conversation/repost/repost.dialog";
import { UsersListTooltip } from "components/conversation/users-list-tooltip/users-list-tooltip";
import { UsersDialog } from "components/conversation/users-list-tooltip/users-list.dialog";
import MenuTooltip from "components/menu-tooltip/menu-tooltip";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Post as PostType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import styles from "./share.module.scss";

interface Props {
  post: PostType;
  count: number;
  id: string;
  onApply: VoidFunction;
  disable?: boolean;
}

export const _Share: React.FC<Props> = ({
  post,
  count,
  id,
  disable,
  onApply
}) => {
  const [t] = useTranslation();
  const [isOpenRePost, setIsOpenRePost, setIsCloseRePost] = useIsOpen();
  const [isOpenList, setIsOpenList, setIsCloseList] = useIsOpen();
  const handleOnApply = useCallback(() => {
    setIsCloseRePost();
    onApply && onApply();
  }, []);

  const renderShareButton = useCallback(
    () => (
      <Center
        className={styles["share"]}
        onClick={() => !disable && setIsOpenRePost()}
      >
        <RowItem className={styles["share__icon"]} size={"small"}>
          <ShareIcon disabled={disable} />
        </RowItem>
        {count > 0 && (
          <RowItem className={styles["share__count"]}>{count}</RowItem>
        )}
      </Center>
    ),
    [disable, count]
  );

  const renderTooltip = useCallback(
    (setOpenDialog: VoidFunction) => (clearAnchor?: VoidFunction) => {
      const onClickRemainder = () => {
        setOpenDialog();
        clearAnchor && clearAnchor();
      };
      return (
        post.rePostsUsers && (
          <UsersListTooltip
            onClickRemainder={onClickRemainder}
            count={count}
            list={post.rePostsUsers}
          />
        )
      );
    },
    [count, post.rePostsUsers]
  );

  return (
    <>
      {post.rePostsUsers?.length ? (
        <MenuTooltip
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          render={renderTooltip(setIsOpenList)}
        >
          <div>{renderShareButton()}</div>
        </MenuTooltip>
      ) : (
        renderShareButton()
      )}
      <UsersDialog
        open={isOpenList}
        onClose={setIsCloseList}
        request={() => getPostRepostsUsers(id)}
        dialogTitle={t("Reposts")}
      />
      <RePostDialog
        post={post}
        open={isOpenRePost}
        onClose={setIsCloseRePost}
        id={id}
        onApply={handleOnApply}
      />
    </>
  );
};

export const Share = React.memo(_Share);
