import { ALERT_MESSAGE } from "./alert-message-actions.constants";

const success: AlertActionCreator = (text, isUseLocalization = false) => ({
  type: ALERT_MESSAGE.SUCCESS,
  className: "alert-message--success",
  text,
  isUseLocalization
});

const warning: AlertActionCreator = (text, isUseLocalization = false) => ({
  type: ALERT_MESSAGE.WARNING,
  className: "alert-message--warning",
  text,
  isUseLocalization
});

const error: AlertActionCreator = (text, isUseLocalization = false) => ({
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

export type AlertActionCreator = (
  text: string,
  isUseLocalization?: boolean
) => IAlertAction;

export interface IAlertAction {
  type: ALERT_MESSAGE;
  className?: string;
  text?: string;
  isUseLocalization?: boolean;
  id?: string;
}
