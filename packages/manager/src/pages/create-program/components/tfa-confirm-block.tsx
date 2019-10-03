import { push } from "connected-react-router";
import ConfirmContainer from "modules/confirm/confirm-container";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import useIsOpen from "shared/hooks/is-open.hook";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";

const _TFAConfirmBlock: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const [
    isOpenConfirmTFA,
    setIsOpenConfirmTFA,
    setIsCloseConfirmTFA
  ] = useIsOpen(true);
  const closeHandle = useCallback(() => {
    dispatch(push(DASHBOARD_ROUTE));
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
