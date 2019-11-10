import ConfirmContainer from "modules/confirm/confirm-container";
import * as React from "react";
import { useCallback } from "react";
import { Push } from "shared/components/link/link";
import useIsOpen from "shared/hooks/is-open.hook";
import { TRADING_ROUTE } from "shared/routes/dashboard.routes";

const _TFAConfirmBlock: React.FC<Props> = ({ id }) => {
  const [
    isOpenConfirmTFA,
    setIsOpenConfirmTFA,
    setIsCloseConfirmTFA
  ] = useIsOpen(true);
  const closeHandle = useCallback(() => {
    Push(TRADING_ROUTE);
    setIsCloseConfirmTFA();
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

interface Props {
  id: string;
}

export const TFAConfirmBlock = React.memo(_TFAConfirmBlock);
