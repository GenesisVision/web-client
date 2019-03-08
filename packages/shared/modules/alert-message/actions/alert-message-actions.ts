import { ALERT_MESSAGE } from "./alert-message-actions.constants";

export interface IAlertAction {
  type: ALERT_MESSAGE;
  className?: string;
  text?: string;
  isUseLocalization?: boolean;
  id?: string;
}

const success = (
  text: string,
  isUseLocalization: boolean = false
): IAlertAction => ({
  type: ALERT_MESSAGE.SUCCESS,
  className: "alert-message--success",
  text,
  isUseLocalization
});

const warning = (
  text: string,
  isUseLocalization: boolean = false
): IAlertAction => ({
  type: ALERT_MESSAGE.WARNING,
  className: "alert-message--warning",
  text,
  isUseLocalization
});

const error = (
  text: string,
  isUseLocalization: boolean = false
): IAlertAction => ({
  type: ALERT_MESSAGE.ERROR,
  className: "alert-message--danger",
  text,
  isUseLocalization
});

const remove = (id: string): IAlertAction => ({
  type: ALERT_MESSAGE.REMOVE_AT,
  id
});

const clearAll = (): IAlertAction => ({
  type: ALERT_MESSAGE.CLEAR_ALL
});

const alertMessageActions = {
  success,
  warning,
  error,
  remove,
  clearAll
};

export { alertMessageActions };
