import { searchAsset } from "components/conversation/conversation.service";
import { AssetSearchResult } from "components/conversation/conversation.types";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { getTagFromInputText } from "utils/parse";

export const generateTagName = (name: string, type: string): string =>
  `${name} (${type})`;

export const useSearchPanel = ({
  submitOnSelect,
  text,
  setValue
}: {
  submitOnSelect?: (value: AssetSearchResult) => void;
  text: string;
  setValue: (value: string) => void;
}) => {
  const [fixedCaretPosition, setFixedCaretPosition] = useState<number>(0);
  const [caretPosition, setCaretPosition] = useState<number>(0);
  const [tag, setTag] = useState<string>("");
  const {
    isPending: isSearchPending,
    sendRequest,
    data: searchResult,
    setData: setSearchData
  } = useApiRequest<AssetSearchResult[]>({
    request: searchAsset
  });
  const [isOpenSearchPanel, openSearchPanel, closeSearchPanel] = useIsOpen();

  useEffect(() => {
    if (searchResult || isSearchPending) openSearchPanel();
    else closeSearchPanel();
  }, [searchResult, isSearchPending]);

  useEffect(() => {
    if (fixedCaretPosition !== 0) setFixedCaretPosition(0);
  }, [fixedCaretPosition, setFixedCaretPosition]);

  const searchDebounced = useCallback(debounce(sendRequest, 200), []);

  const onChangeCaret = useCallback(
    (position: number) => {
      const underCaretText = text.slice(0, position);
      const tag = getTagFromInputText(underCaretText);
      if (tag.length > 3) {
        setTag(tag);
        searchDebounced(tag);
        setCaretPosition(position);
      } else setSearchData(undefined);
    },
    [text, setTag, setCaretPosition, setSearchData]
  );

  const handleSearchItemSelect = useCallback(
    (result: AssetSearchResult) => {
      const { name, type } = result;
      const fullTagName = generateTagName(name, type);
      const tagIndex = text.lastIndexOf(`@${tag}`, caretPosition) + 1;
      const replacedTag = text.slice(0, tagIndex) + fullTagName;
      const newText = replacedTag + text.slice(tagIndex + tag.length);
      if (replacedTag !== text.slice(0, tagIndex + fullTagName.length)) {
        if (submitOnSelect) submitOnSelect(result);
        else setValue(newText);
      }
      setFixedCaretPosition(tagIndex + fullTagName.length);
    },
    [
      caretPosition,
      text,
      tag,
      setValue,
      onChangeCaret,
      setFixedCaretPosition,
      onChangeCaret
    ]
  );

  return {
    isSearchPending,
    fixedCaretPosition,
    handleSearchItemSelect,
    isOpenSearchPanel,
    searchResult,
    onChangeCaret
  };
};
