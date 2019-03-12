import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

interface IItemsCounterProps {
  totalPages: number;
  currentPage: number;
  itemsOnPage: number;
  totalItems: number;
}

const ItemsCounter: React.FC<IItemsCounterProps & InjectedTranslateProps> = ({
  totalPages,
  currentPage,
  itemsOnPage,
  totalItems,
  t
}) => {
  if (!totalItems) return null;
  const from = (currentPage - 1) * itemsOnPage + 1;
  const to = Math.min(currentPage * itemsOnPage, totalItems);
  return (
    <span className="table__footer-text">
      {t("table.items-counter", { from, to, total: totalItems })}
    </span>
  );
};

export default translate()(ItemsCounter);
