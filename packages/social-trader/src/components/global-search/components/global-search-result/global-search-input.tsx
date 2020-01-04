import "./global-search-input.scss";

import GVTextField from "components/gv-text-field";
import SearchIcon from "components/icon/search-icon/search-icon";
import React, { useCallback } from "react";

const GlobalSearchInput: React.FC<Props> = React.memo(({ query, onChange }) => {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<any>) => onChange(event.target.value),
    [onChange]
  );

  return (
    <div className="global-search-input">
      {/*
      //@ts-ignore TODO сделать фикс GVTextField*/}
      <GVTextField
        noMargin
        name="queryValue"
        wrapperClassName="global-search-input__wrapper"
        placeholder="Search"
        autoComplete="off"
        adornment={<SearchIcon primary />}
        adornmentPosition="start"
        value={query}
        onChange={handleOnChange}
        autoFocus
      />
    </div>
  );
});

interface Props {
  onChange(value: string): void;
  query: string;
}

export default GlobalSearchInput;
