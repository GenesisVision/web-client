import { push } from "connected-react-router";
import ConfirmContainer from "modules/confirm/confirm-container";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import useIsOpen from "shared/hooks/is-open.hook";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";

const _TFAConfirmBlock: React.FC<Props> = ({ id, isOpen }) => {
  const dispatch = useDispatch();
  const [
    isOpenConfirmTFA,
    setIsOpenConfirmTFA,
    setIsCloseConfirmTFA,
    setIsOpenValueConfirmTFA
  ] = useIsOpen();
  useEffect(
    () => {
      setIsOpenValueConfirmTFA(isOpen);
    },
    [isOpen]
  );
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
  isOpen: boolean;
  id: string;
}

export const TFAConfirmBlock = React.memo(_TFAConfirmBlock);
