import { globalSearchInputAction } from "components/global-search/actions/global-search.action";
import { SearchInputField } from "components/global-search/components/global-search-result/global-search-input";
import { globalSearchInputSelector } from "components/global-search/reducers/global-search.reducer";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const _HeaderSearchInput: React.FC<Props> = ({ setSearchIsClose }) => {
  const dispatch = useDispatch();
  const [cancelSearch, setSearchIsCancel, setSearchIsNotCancel] = useIsOpen();
  const searchValue = useSelector(globalSearchInputSelector);
  const handleSearchInput = useCallback(
    ({ target: { value } }: React.ChangeEvent<any>) => {
      dispatch(globalSearchInputAction(value));
      setSearchIsNotCancel();
    },
    []
  );
  const handleSearchBlur = useCallback(() => {
    if (!searchValue) setSearchIsClose();
  }, [searchValue]);
  const handleSearchCancel = useCallback(() => {
    dispatch(globalSearchInputAction(""));
    setSearchIsCancel();
  }, []);

  useEffect(() => {
    if (cancelSearch && !searchValue) setSearchIsClose();
  }, [cancelSearch, searchValue]);

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
