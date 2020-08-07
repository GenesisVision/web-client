import { Push } from "components/link/link";
import ConfirmContainer from "modules/confirm/confirm-container";
import * as React from "react";
import { useCallback, useState } from "react";
import { TRADING_ROUTE } from "routes/dashboard.routes";

interface Props {
  id: string;
}

const _TFAConfirmBlock: React.FC<Props> = ({ id }) => {
  const [isOpenConfirmTFA, setIsOpenConfirmTFA] = useState(true);
  const closeHandle = useCallback(() => {
    Push(TRADING_ROUTE);
    setIsOpenConfirmTFA(false);
  }, []);
  return (
    <>
      <ConfirmContainer
        open={isOpenConfirmTFA}
        onClose={closeHandle}
        onApply={closeHandle}
        programId={id}
      />
    </>
  );
};

export const TFAConfirmBlock = React.memo(_TFAConfirmBlock);
