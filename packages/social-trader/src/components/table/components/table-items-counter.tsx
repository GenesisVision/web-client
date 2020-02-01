import withLoader from "decorators/with-loader";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import { IPaging } from "../helpers/paging.helpers";

interface IItemsCounterProps extends IPaging {}

const ItemsCounter: React.FC<IItemsCounterProps & WithTranslation> = ({
  currentPage = 1,
  itemsOnPage = 0,
  totalItems = 0,
  t
}) => {
  const from = (currentPage - 1) * itemsOnPage + 1;
  const to = Math.min(currentPage * itemsOnPage, totalItems);
  return (
    <span className="table__footer-text">
      {t("table.items-counter", { from, to, total: totalItems })}
    </span>
  );
};

export default withLoader(translate()(React.memo(ItemsCounter)));
