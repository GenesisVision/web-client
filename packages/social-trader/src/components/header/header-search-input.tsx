import { SearchInputField } from "components/global-search/components/global-search-result/global-search-input/global-search-input";
import {
  GlobalSearchContext,
  GlobalSearchInitialState
} from "components/global-search/global-search-context";
import useIsOpen from "hooks/is-open.hook";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect } from "react";

const _HeaderSearchInput: React.FC<Props> = ({ setSearchIsClose }) => {
  const { asPath } = useRouter();

  const [cancelSearch, setSearchIsCancel, setSearchIsNotCancel] = useIsOpen();
  const { searchValue, setSearchValue } = useContext(GlobalSearchContext);
  const handleSearchInput = useCallback(
    ({ target: { value } }: React.ChangeEvent<any>) => {
      setSearchValue(value);
      setSearchIsNotCancel();
    },
    []
  );
  const handleSearchBlur = useCallback(() => {
    if (!searchValue) setSearchIsClose();
  }, [searchValue]);
  const handleSearchCancel = useCallback(() => {
    setSearchValue(GlobalSearchInitialState);
    setSearchIsCancel();
  }, []);

  useEffect(() => {
    if (cancelSearch && !searchValue) setSearchIsClose();
  }, [cancelSearch, searchValue]);

  useEffect(() => {
    if (searchValue) handleSearchCancel();
  }, [asPath]);

  return (
    <SearchInputField
      onBlur={handleSearchBlur}
      value={searchValue}
      onChange={handleSearchInput}
      onCancel={handleSearchCancel}
    />
  );
};

interface Props {
  setSearchIsClose: VoidFunction;
}

const HeaderSearchInput = React.memo(_HeaderSearchInput);
export default HeaderSearchInput;
