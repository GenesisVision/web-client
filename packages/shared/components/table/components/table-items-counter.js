import React from "react";
import { translate } from "react-i18next";

const ItemsCounter = ({
  totalPages,
  currentPage,
  itemsOnPage,
  totalItems: total,
  t
}) => {
  if (!total) return null;
  const from = (currentPage - 1) * itemsOnPage + 1;
  const to = Math.min(currentPage * itemsOnPage, total);
  return (
    <span
      style={{
        letterSpacing: 0.56,
        color: "rgba(232, 239, 243, 0.4)",
        fontSize: 14
      }}
    >
      {t("table.items-counter", { from, to, total })}
    </span>
  );
};

export default translate()(ItemsCounter);
