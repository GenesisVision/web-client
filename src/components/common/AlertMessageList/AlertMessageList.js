import { Alert } from 'reactstrap'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import alertMessageActions from '../../../actions/alertMessageActions'
import history from '../../../utils/history';

const ClearAllButton = ({ onClick }) => (
  <div className='clearfix'>
    <button type="button" className="btn btn-secondary btn-sm float-right" onClick={onClick}>Clear All</button>
  </div>
)

const AlertMessage = ({ text, color, onDismiss }) => (
  <Alert color={color} toggle={onDismiss}>
    <div>
      {text}
    </div>
  </Alert>
)

class AlertMessageList extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clearAllMessages();
    });
  }

  render() {
    const { messages, onDismiss, clearAllMessages } = this.props;

    if (messages.length === 0) {
      return null;
    }

    const renderClearAllButton = messages.length > 1;
    const messageComponents = messages.map((message, idx) => (
      <AlertMessage
        key={idx}
        color={message.className}
        text={message.text}
        onDismiss={onDismiss(idx)} />
    ))

    return (
      <div>
        {renderClearAllButton && (<ClearAllButton onClick={clearAllMessages} />)}
        {messageComponents}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const messages = state.alertMessages;
  return { messages };
}

const mapDispatchToProps = (dispatch) => ({
  onDismiss: (idx) => () => {
    dispatch(alertMessageActions.clearMessage(idx));
  },
  clearAllMessages: () => {
    dispatch(alertMessageActions.clearAll());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertMessageList)
