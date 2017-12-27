import { shallow } from 'enzyme'
import React from 'react'
import TraderList from './TraderList'

describe('TraderList', () => {
  let wrapper;
  describe('when fetching', () => {
    beforeEach(() => {
      const tradersInfo = {
        isFetching: true
      };
      wrapper = shallow(<TraderList tradersInfo={tradersInfo} />);
    });

    it('should not display trader`s container', () => {
      expect(
        wrapper.find('.list-group').length
      ).toBe(0);
    });
  });

  describe('when fetched', () => {
    beforeEach(() => {
      const tradersInfo = {
        items: [],
        isFetching: false
      };
      wrapper = shallow(<TraderList tradersInfo={tradersInfo} />);
    });

    it('should display display trader`s container', () => {
      expect(
        wrapper.find('.list-group').length
      ).not.toBe(0);
    });
  });
});