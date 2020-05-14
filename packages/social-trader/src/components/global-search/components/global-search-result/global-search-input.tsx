import GVButton from "components/gv-button";
import GVTextField from "components/gv-text-field";
import { CloseIcon } from "components/icon/close-icon";
import SearchIcon from "components/icon/search-icon/search-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React, { useCallback } from "react";
import { SizesType } from "utils/types";

export const SearchInputField: React.FC<{
  autoFocus?: boolean;
  size?: SizesType;
  canClose?: boolean;
  onBlur?: VoidFunction;
  value: string;
  onCancel?: VoidFunction;
  onChange: (event: React.ChangeEvent<any>) => void;
}> = ({
  autoFocus = true,
  size,
  canClose = true,
  value,
  onChange,
  onCancel,
  onBlur
}) => {
  return (
    <Row wide>
      <RowItem wide>
        <GVTextField
          size={size}
          onBlur={onBlur}
          wide
          noMargin
          name="queryValue"
          placeholder="Search"
          autoComplete="off"
          adornment={<SearchIcon size={size} primary />}
          adornmentPosition="start"
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      </RowItem>
      {canClose && (
        <GVButton noPadding variant="text" color="secondary" onClick={onCancel}>
          <CloseIcon />
        </GVButton>
      )}
    </Row>
  );
};

const GlobalSearchInput: React.FC<Props> = React.memo(
  ({ autoFocus, size, canClose, query, onChange }) => {
    const handleOnChange = useCallback(
      (event: React.ChangeEvent<any>) => onChange(event.target.value),
      [onChange]
    );

    return (
      <div>
        {/*
      //@ts-ignore TODO сделать фикс GVTextField*/}
        <SearchInputField
          autoFocus={autoFocus}
          size={size}
          canClose={canClose}
          value={query}
          onChange={handleOnChange}
        />
      </div>
    );
  }
);

interface Props {
  autoFocus?: boolean;
  size?: SizesType;
  canClose?: boolean;
  onChange(value: string): void;
  query: string;
}

export default GlobalSearchInput;
