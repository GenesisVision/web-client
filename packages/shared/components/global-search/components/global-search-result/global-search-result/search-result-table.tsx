import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";

const SearchResultTable: React.FC<
  { data: boolean } & InjectedTranslateProps
> = ({ data, children, t }) => (
  <React.Fragment>
    {data ? (
      children
    ) : (
      <div className="global-search-result__loading">{t("table.loading")}</div>
    )}
  </React.Fragment>
);
export default translate()(SearchResultTable);
