import classNames from "classnames";
import PagerLinkButton from "components/pager/pager-link-button";
import { RowItem } from "components/row-item/row-item";
import * as React from "react";
import { useCallback } from "react";

export const _PagerButton: React.FC<Props> = ({
  asLink = false,
  page,
  label,
  current,
  clickHandle
}) => {
  const callback = useCallback(
    (e: React.MouseEvent) => {
      e && e.preventDefault();
      clickHandle(page);
    },
    [page, clickHandle]
  );

  const classname = classNames("pager__button", {
    "pager__button--current": page === current
  });

  const value = label || page;

  const renderButtonContent = () => {
    if (asLink) {
      return (
        <PagerLinkButton
          page={page}
          value={value}
          callback={callback}
          classname={classname}
        />
      );
    } else {
      return (
        <div className={classname} onClick={callback}>
          {value}
        </div>
      );
    }
  };

  return <RowItem small>{renderButtonContent()}</RowItem>;
};

export const PagerButton = React.memo(_PagerButton);
export default PagerButton;

interface Props {
  asLink?: boolean;
  current: number;
  page: number;
  label?: string;
  key?: string | number;
  clickHandle(page: number): void;
}
