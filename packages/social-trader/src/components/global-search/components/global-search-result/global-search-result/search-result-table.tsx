import * as React from "react";
import { useTranslation } from "react-i18next";

const SearchResultTable: React.FC<Props> = ({ data, children }) => {
  const { t } = useTranslation();
  return (
    <>
      {data ? (
        children
      ) : (
        <div className="global-search-result__loading">
          {t("table.loading")}
        </div>
      )}
    </>
  );
};
export default SearchResultTable;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: boolean;
}
