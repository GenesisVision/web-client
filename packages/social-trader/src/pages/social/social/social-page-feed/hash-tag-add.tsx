import { ConversationInput } from "components/conversation/conversation-input/conversation-input";
import { AssetSearchResult } from "components/conversation/conversation.types";
import { SearchPanel } from "components/conversation/search-panel/search-panel";
import { useSearchPanel } from "components/conversation/search-panel/search-panel.hook";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER
} from "components/popover/popover";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { Row } from "components/row/row";
import { FilterTitle } from "components/table/components/filtering/filter-title";
import TileFilterButton from "components/table/components/filtering/tile-filter-button";
import useAnchor from "hooks/anchor.hook";
import { SocialPageContext } from "pages/social/social/social-page.context";
import React, { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

const VALUE_FIELD = "VALUE_FIELD";

const HashTagAddPopover: React.FC<{ clearAnchor: VoidFunction }> = ({
  clearAnchor
}) => {
  const [t] = useTranslation();
  const { searchValue, setSearchValue } = useContext(SocialPageContext);

  const form = useForm<{ [VALUE_FIELD]: string }>({
    defaultValues: { [VALUE_FIELD]: "" },
    mode: "onChange"
  });
  const { handleSubmit, setValue, watch } = form;

  const handleSelectTag = useCallback(
    ({ id, name }: AssetSearchResult) => {
      setSearchValue({
        ...searchValue,
        tagContent: [...searchValue.tagContent, { id, name }]
      });
      clearAnchor();
    },
    [searchValue, setSearchValue]
  );

  const enterSubmit = useCallback(args => {
    setSearchValue({
      ...searchValue,
      hashTags: [...searchValue.hashTags, args[VALUE_FIELD]]
    });
    clearAnchor();
  }, []);

  const inputSubmit = useCallback(() => {
    return handleSubmit(values => {
      return enterSubmit(values);
    });
  }, [enterSubmit, handleSubmit]);

  const {
    isSearchPending,
    fixedCaretPosition,
    handleSearchItemSelect,
    isOpenSearchPanel,
    searchResult,
    onChangeCaret
  } = useSearchPanel({
    submitOnSelect: handleSelectTag,
    text: watch()[VALUE_FIELD],
    setValue: value => setValue(VALUE_FIELD, value, true)
  });

  return (
    <PopoverContentCardBlock>
      <HookForm form={form}>
        <Row>
          <FilterTitle>{t("Enter hash tag")}</FilterTitle>
        </Row>
        <ConversationInput
          autoFocus
          bottomLine
          disabled={false}
          outerCaret={fixedCaretPosition}
          onChangeCaret={onChangeCaret}
          submitForm={inputSubmit()}
          name={VALUE_FIELD}
        />
        {isOpenSearchPanel && (
          <Row>
            <SearchPanel
              isSearchPending={isSearchPending}
              onClick={handleSearchItemSelect}
              searchResult={searchResult}
            />
          </Row>
        )}
      </HookForm>
    </PopoverContentCardBlock>
  );
};

const _HashTagAdd: React.FC = () => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [t] = useTranslation();
  return (
    <>
      <TileFilterButton
        isActive={!!anchor}
        onClick={setAnchor}
        title={`#${t("filters.tag.add")}`}
      />
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        fixedHorizontal
        orientation={ORIENTATION_POPOVER.RIGHT}
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        noPadding
      >
        <HashTagAddPopover clearAnchor={clearAnchor} />
      </Popover>
    </>
  );
};

export const HashTagAdd = React.memo(_HashTagAdd);
