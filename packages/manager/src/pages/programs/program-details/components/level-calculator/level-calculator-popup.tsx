import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

class _LevelCalculatorPopup extends React.PureComponent<Props, State> {
  render() {
    return <div className="level-calculator-popup">Popup</div>;
  }
}

const LevelCalculatorPopup = translate()(_LevelCalculatorPopup);
export default LevelCalculatorPopup;

interface Props extends InjectedTranslateProps {}
interface State {}
