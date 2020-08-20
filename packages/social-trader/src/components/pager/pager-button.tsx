import {
  PagerStyledButton,
  PagerStyledLink
} from "components/pager/pager.styled-components";
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

  const value = label || page;

  const renderButtonContent = () => {
    if (asLink) {
      return (
        <PagerStyledLink
          current={page === current}
          page={page}
          value={value}
          callback={callback}
        />
      );
    } else {
      return (
        <PagerStyledButton current={page === current} onClick={callback}>
          {value}
        </PagerStyledButton>
      );
    }
  };

  return <RowItem size={"small"}>{renderButtonContent()}</RowItem>;
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
