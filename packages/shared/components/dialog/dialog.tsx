import "./dialog.scss";

import classNames from "classnames";
import { GVButton } from "gv-react-components";
import * as React from "react";
import EventListener from "react-event-listener";
import { InjectedTranslateProps } from "react-i18next";
import { translate } from "react-i18next";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal from "shared/components/modal/modal";
import GVScroll from "shared/components/scroll/gvscroll";

export interface IDialogProps {
  open: boolean;
  onClose: (param?: any) => void;
  className?: string;
  children?: any;
  wider?: boolean;
}

class Dialog extends React.Component<IDialogProps & InjectedTranslateProps> {
  handleKeyPress = (event: KeyboardEvent) => {
    const { onClose } = this.props;

    //Esc
    if (event.keyCode === 27) {
      onClose(event);
    }
  };
  render() {
    const { t, open, onClose, className, children, wider } = this.props;
    return (
      <Modal open={open} fixed disableBackdropClick>
        <EventListener target={document} onKeyUp={this.handleKeyPress} />
        <GVScroll autoHide>
          <div className="dialog__content">
            <div className="dialog__background" />
            <div className="dialog__backdrop" onClick={onClose} />
            <GVButton
              variant="text"
              color="secondary"
              className={classNames("dialog__close dialog__close--outside", {
                "dialog__close--wider": wider
              })}
              onClick={onClose}
            >
              <React.Fragment>
                <CloseIcon /> {t("buttons.close")}
              </React.Fragment>
            </GVButton>
            <div className={classNames("dialog", className)}>
              <GVButton
                variant="text"
                color="secondary"
                className="dialog__close dialog__close--inside"
                onClick={onClose}
              >
                <CloseIcon />
              </GVButton>
              {children}
            </div>
          </div>
        </GVScroll>
      </Modal>
    );
  }
}

export default translate()(Dialog);
