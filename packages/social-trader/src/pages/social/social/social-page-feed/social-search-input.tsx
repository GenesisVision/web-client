import { SearchInputField } from "components/global-search/components/global-search-result/global-search-input";
import useIsOpen from "hooks/is-open.hook";
import {
  SocialSearchContext,
  SocialSearchInitialState
} from "pages/social/social/social-page.context";
import React, { useCallback, useContext, useEffect } from "react";

const _SocialSearchInput: React.FC<Props> = ({ setSearchIsClose }) => {
  const [cancelSearch, setSearchIsCancel, setSearchIsNotCancel] = useIsOpen();
  const { searchValue, setSearchValue } = useContext(SocialSearchContext);
  const handleSearchInput = useCallback(
    ({ target: { value } }: React.ChangeEvent<any>) => {
      setSearchValue({ ...searchValue, mask: value });
      setSearchIsNotCancel();
    },
    [searchValue]
  );
  const handleSearchBlur = useCallback(() => {
    if (!searchValue.mask) setSearchIsClose();
  }, [searchValue]);
  const handleSearchCancel = useCallback(() => {
    setSearchValue({ ...searchValue, mask: undefined });
    setSearchIsCancel();
  }, [searchValue]);

  useEffect(() => {
    if (cancelSearch && !searchValue.mask) setSearchIsClose();
  }, [cancelSearch, searchValue]);

  return (
    <SearchInputField
      onBlur={handleSearchBlur}
      value={searchValue.mask}
      onChange={handleSearchInput}
      onCancel={handleSearchCancel}
    />
  );
};

interface Props {
  setSearchIsClose: VoidFunction;
}

const SocialSearchInput = React.memo(_SocialSearchInput);
export default SocialSearchInput;
