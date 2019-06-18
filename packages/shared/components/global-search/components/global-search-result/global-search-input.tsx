import "./global-search-input.scss";

import React, { useCallback } from "react";
import GVTextField from "shared/components/gv-text-field";
import SearchIcon from "shared/components/icon/search-icon/search-icon";

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
        name="queryValue"
        wrapperClassName="global-search-input__wrapper"
        placeholder="Search for programs or funds or managers"
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
