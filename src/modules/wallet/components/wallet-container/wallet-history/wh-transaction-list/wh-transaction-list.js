import React from "react";

import WHTransaction from "../wh-transaction/wh-transaction";

const WHTransactionList = ({ transactions }) => {
  return transactions.map(x => <WHTransaction key={x.id} transaction={x} />);
};

export default WHTransactionList;
