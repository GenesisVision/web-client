import { Center } from "components/center/center";
import { ShareIcon } from "components/conversation/icons/share.icon";
import { RePostDialog } from "components/conversation/repost/repost.dialog";
import { UsersListTooltip } from "components/conversation/users-list-tooltip/users-list-tooltip";
import MenuTooltip from "components/menu-tooltip/menu-tooltip";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Post as PostType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";

import styles from "./share.module.scss";

export const _Share: React.FC<Props> = ({
  post,
  count,
  id,
  disable,
  onApply
}) => {
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    setIsClose();
    onApply && onApply();
  }, []);

  const renderShareButton = useCallback(
    () => (
      <Center
        className={styles["share"]}
        onClick={() => !disable && setIsOpen()}
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
    () =>
      post.rePostsUsers && (
        <UsersListTooltip count={count} list={post.rePostsUsers} />
      ),
    [count, post.rePostsUsers]
  );

  return (
    <>
      {post.rePostsUsers?.length ? (
        <MenuTooltip
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          render={renderTooltip}
        >
          <div>{renderShareButton()}</div>
        </MenuTooltip>
      ) : (
        renderShareButton()
      )}
      <RePostDialog
        post={post}
        open={isOpen}
        onClose={setIsClose}
        id={id}
        onApply={handleOnApply}
      />
    </>
  );
};

interface Props {
  post: PostType;
  count: number;
  id: string;
  onApply: VoidFunction;
  disable?: boolean;
}

export const Share = React.memo(_Share);
