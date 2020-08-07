import { Text } from "components/text/text";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { IPaging } from "../helpers/paging.helpers";

interface IItemsCounterProps extends IPaging {}

const ItemsCounter: React.FC<IItemsCounterProps> = ({
  currentPage = 1,
  itemsOnPage = 0,
  totalItems = 0
}) => {
  const [t] = useTranslation();
  const from = (currentPage - 1) * itemsOnPage + 1;
  const to = Math.min(currentPage * itemsOnPage, totalItems);
  return (
    <Text muted>
      {t("table.items-counter", { from, to, total: totalItems })}
    </Text>
  );
};

export default withLoader(React.memo(ItemsCounter));
