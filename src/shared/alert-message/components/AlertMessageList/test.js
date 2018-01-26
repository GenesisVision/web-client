import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { AlertMessageList, mapStateToProps, mapDispatchToProps } from './index'
import { alertMessageActions, alertMessageActionTypes } from '../../actions/index';

describe('AlertMessageList', () => {

  let wrapper;
  describe('passed no messages', () => {
    beforeEach(() => {
      const props = {
        messages: [],
        removeMessage: () => { }
      };
      wrapper = shallow(<AlertMessageList {...props} />);
    });
    it('should not be rendered', () => {
      expect(wrapper.text()).toBe('');
    });
  });

  describe('passed single message', () => {
    beforeEach(() => {
      const props = {
        messages: [{ text: 'text' }],
        removeMessage: () => { }
      };
      wrapper = shallow(<AlertMessageList {...props} />);
    });
    it('should show single message', () => {
      expect(wrapper.text()).toBe('<AlertMessage />');
    });
    it('should not show button Clear All', () => {
      expect(wrapper.find('ClearAllButton').length).toBe(0);
    });
  });

  describe('passed several messages', () => {
    beforeEach(() => {
      const props = {
        messages: [{ text: 'text1' }, { text: 'text2' }],
        removeMessage: () => { }
      };
      wrapper = shallow(<AlertMessageList {...props} />);
    });
    it('should show button Clear All', () => {
      expect(wrapper.find('ClearAllButton').length).toBe(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should contain messages array', () => {
      const state = {
        alertMessages: [{ text: 'text' }]
      };
      const expectedState = {
        messages: state.alertMessages
      };
      expect(mapStateToProps(state)).toEqual(expectedState);
    });
  });

  describe('mapDispatchToProps', () => {
    let dispatch;
    beforeEach(()=>{
      dispatch = jest.fn();
    });
    afterEach(()=>{
      dispatch.mockClear();
    });
    
    it('should call Clear All action', () => {
      const { clearAllMessages } = mapDispatchToProps(dispatch);
      clearAllMessages();
      expect(dispatch.mock.calls[0][0]).toEqual(alertMessageActions.clearAll());
    });
    it('should call Remove At action', () => {
      const { removeMessage } = mapDispatchToProps(dispatch);
      removeMessage(1)();
      expect(dispatch.mock.calls[0][0]).toEqual(alertMessageActions.removeAt(1));
    });    
  });
});
