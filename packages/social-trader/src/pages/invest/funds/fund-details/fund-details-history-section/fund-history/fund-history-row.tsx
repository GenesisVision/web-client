import useFlag from "hooks/flag.hook";
import FundHistoryFullRow from "pages/invest/funds/fund-details/fund-details-history-section/fund-history/fund-history-full-row";
import FundHistoryShortRow from "pages/invest/funds/fund-details/fund-details-history-section/fund-history/fund-history-short-row";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import React, { useCallback } from "react";

interface Props {
  item: IFundHistoryDataItem;
}

const _FundHistoryRow: React.FC<Props> = ({ item }) => {
  const [isOpen, setOpen, setClose] = useFlag();

  const handleOpen = useCallback(() => {
    if (!item.trades?.length) return;
    isOpen ? setClose() : setOpen();
  }, [isOpen]);

  return (
    <>
      <FundHistoryShortRow isOpen={isOpen} setOpen={handleOpen} item={item} />
      {isOpen && <FundHistoryFullRow item={item} />}
    </>
  );
};

const FundHistoryRow = React.memo(_FundHistoryRow);
export default FundHistoryRow;
