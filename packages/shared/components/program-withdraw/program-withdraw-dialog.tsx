import * as React from "react";
import { useEffect, useState } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import FormError from "shared/components/form/form-error/form-error";
import useErrorMessage from "shared/hooks/error-message.hook";

import ProgramWithdrawPopup, {
  IProgramWithdrawPopupProps
} from "./program-withdraw-popup";

const _ProgramWithdrawDialog: React.FC<
  IDialogProps & IProgramWithdrawPopupProps
> = ({
  open,
  onClose,
  accountCurrency,
  assetCurrency,
  fetchInfo,
  withdraw
}) => {
  const [periodEnds, setPeriodEnds] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [availableToWithdraw, setAvailableToWithdraw] = useState<
    number | undefined
  >(undefined);
  const [rate, setRate] = useState<number>(1);
  const { errorMessage, setErrorMessage } = useErrorMessage();
  useEffect(() => {
    fetchInfo()
      .then(({ periodEnds, title, availableToWithdraw, rate }) => {
        setPeriodEnds(periodEnds);
        setTitle(title);
        setAvailableToWithdraw(availableToWithdraw);
        setRate(rate);
      })
      .catch(setErrorMessage);
  }, []);
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        condition={availableToWithdraw === undefined || !title || !periodEnds}
        loader={<DialogLoader />}
        periodEnds={periodEnds!}
        title={title!}
        availableToWithdraw={availableToWithdraw!}
        rate={rate}
        withdraw={withdraw}
        accountCurrency={accountCurrency}
        assetCurrency={assetCurrency}
        fetchInfo={fetchInfo}
      />
      <div className="form-error">
        <FormError error={errorMessage} />
      </div>
    </Dialog>
  );
};

const ProgramWithdrawDialog = React.memo(_ProgramWithdrawDialog);
export default ProgramWithdrawDialog;
